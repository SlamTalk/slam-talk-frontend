export interface InAppNotification {
  notificationId: number;
  message: string;
  uri: string;
  userId: number | null;
  notificationType: string; // "LEVEL" or "BASKETBALL" or "MATE" or "TEAM" or "COMMUNITY" or "CHAT"
  createdAt: string;
  read: true;
}
