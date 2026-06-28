import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs, HeadersFunction } from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { Page, Layout, Card, FormLayout, TextField, Button, Text, BlockStack } from "@shopify/polaris";
import connectToDatabase from "../mongoose.server";
import { Announcement } from "../models/Announcement.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  // Connect to DB
  await connectToDatabase();

  // Load existing announcement from Metafields
  const response = await admin.graphql(`
    #graphql
    query {
      shop {
        metafield(namespace: "my_app", key: "announcement") {
          value
        }
      }
    }
  `);
  
  const json = await response.json();
  const existingAnnouncement = json.data?.shop?.metafield?.value || "";

  return { existingAnnouncement };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const text = formData.get("announcementText") as string;
  
  if (!text) {
    return { success: false, error: "Text is required" };
  }

  // save to Database
  await connectToDatabase();
  await Announcement.create({
    shop: session.shop,
    text: text,
  });

  // sync to Shopify Metafield
  // first get the Shop ID
  const shopResponse = await admin.graphql(`
    #graphql
    query {
      shop {
        id
      }
    }
  `);
  const shopJson = await shopResponse.json();
  const shopId = shopJson.data.shop.id;

  // now set the metafield
  const metafieldResponse = await admin.graphql(
    `#graphql
    mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          value
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        metafields: [
          {
            namespace: "my_app",
            key: "announcement",
            type: "single_line_text_field",
            value: text,
            ownerId: shopId,
          }
        ]
      }
    }
  );
  
  const metaJson = await metafieldResponse.json();
  if (metaJson.data?.metafieldsSet?.userErrors?.length > 0) {
    console.error("Metafield errors:", metaJson.data.metafieldsSet.userErrors);
    return { success: false, error: metaJson.data.metafieldsSet.userErrors[0].message };
  }

  return { success: true };
};

export default function Index() {
  const { existingAnnouncement } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();
  
  const [announcementText, setAnnouncementText] = useState(existingAnnouncement);

  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.success) {
      shopify.toast.show("Announcement saved and synced!");
    } else if (fetcher.data?.error) {
      shopify.toast.show("Error saving announcement", { isError: true });
    }
  }, [fetcher.data, shopify]);

  const handleSave = () => {
    fetcher.submit(
      { announcementText },
      { method: "POST" }
    );
  };

  return (
    <Page title="Announcement Banner Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Storefront Announcement
              </Text>
              <Text as="p">
                Enter the text you want to display on the floating banner across your storefront.
                When you click save, it will be recorded in our database for audit purposes and synced to your shop&apos;s metafields.
              </Text>
              <FormLayout>
                <TextField
                  label="Announcement Text"
                  value={announcementText}
                  onChange={setAnnouncementText}
                  autoComplete="off"
                  placeholder="e.g. Sale 50% Off!"
                />
                <Button variant="primary" onClick={handleSave} loading={isLoading}>
                  Save
                </Button>
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
