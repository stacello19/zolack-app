export interface ChannelProps {
  id: number;
  channel_name: string;
  goalieId: number;
}

export interface ChatHeaderProps {
  activeChannel: number | null;
  channelName: string;
  setEditModal: (e: any) => void;
}

export interface UserProps {
  userID: string;
  username: string;
  isOnline: boolean;
}
