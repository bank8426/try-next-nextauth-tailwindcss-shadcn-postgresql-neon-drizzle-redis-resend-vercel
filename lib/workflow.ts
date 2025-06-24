import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  console.error("Send email not implemented");

  // TODO
  // await qstashClient.publishJSON({
  //   // api: {
  //   //   name: "email",
  //   //   // provider: "https://firstqstashmessage.requestcatcher.com/test",
  //   // },
  //   // url: "https://firstqstashmessage.requestcatcher.com/test",
  //   body: {
  //     from: "Gu Bank <gubankcpe.dev@gmail.com>",
  //     to: [email],
  //     subject: "Helloo",
  //     html: "<p>World</p>",
  //   },
  // });
};
