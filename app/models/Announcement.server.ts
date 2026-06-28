import mongoose, { Document, Model } from 'mongoose';

export interface IAnnouncement extends Document {
  shop: string;
  text: string;
  createdAt: Date;
}

const AnnouncementSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
