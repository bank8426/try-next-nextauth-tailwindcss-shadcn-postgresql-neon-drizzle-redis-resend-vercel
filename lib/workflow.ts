import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";
import emailjs from "@emailjs/nodejs";

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
  try {
    await qstashClient.publishJSON({
      url: "https://api.emailjs.com/api/v1.0/email/send",
      body: {
        service_id: config.env.emailJS.serviceId,
        template_id: config.env.emailJS.templateId,
        user_id: config.env.emailJS.publicKey,
        template_params: {
          email,
          subject,
          message,
        },
        accessToken: config.env.emailJS.privateKey,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
