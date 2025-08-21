import {
  Music,
  FileAudio,
  Headphones,
  Mic,
  FileText,
  Upload,
  Download,
  Check,
  X,
  Clock,
  File,
  ArrowUpDown,
  Volume2,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Loader2,
  BarChart3,
  HardDrive,
} from "lucide-react";

// File type to icon mapping
export const getFileIcon = (fileType) => {
  if (fileType.includes("mp3")) return Music;
  if (fileType.includes("wav")) return FileAudio;
  if (fileType.includes("m4a") || fileType.includes("mp4")) return Headphones;
  if (fileType.includes("ogg")) return Mic;
  return Music; // Default fallback
};

// Action icons
export const actionIcons = {
  upload: Upload,
  download: Download,
  check: Check,
  close: X,
  clock: Clock,
  file: File,
  reorder: ArrowUpDown,
  volume: Volume2,
  settings: Settings,
  play: Play,
  pause: Pause,
  reset: RotateCcw,
  loader: Loader2,
  chart: BarChart3,
  drive: HardDrive,
};

// Upload area icons
export const uploadIcons = {
  default: FileText,
  audio: Music,
  multiple: Music,
};
