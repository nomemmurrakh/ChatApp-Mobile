type MailSuggestion = {
  address: string; // the address; part before the @ sign
  domain: string; // the suggested domain
  full: string; // the full suggested email
};

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

type Chat = {
  fullname: string;
  image: string;
  message: string;
  isTyping: boolean;
  unreadCount: number;
  time: string;
};

type Message = {
  content: string;
  time: string;
  sent: boolean;
  read: boolean;
};