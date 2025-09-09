export interface InputQueryProps {
  messageCount: number;

  chatRef: React.RefObject<{ scrollToBottom: () => void } | null>;
}

export interface CustomSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: CustomSpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
}

export interface CustomSpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}
