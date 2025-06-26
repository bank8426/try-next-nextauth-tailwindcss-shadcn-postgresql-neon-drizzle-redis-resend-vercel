import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";
import emailjs from "@emailjs/browser";

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
    console.log("sending email with : ", {
      email,
      subject,
      message,
    });

    const result = await emailjs.send(
      config.env.emailJS.serviceId!,
      config.env.emailJS.templateId!,
      {
        email,
        subject,
        message,
      },
    );

    console.log("sent email result");
    console.log(result);
  } catch (error) {
    console.log(error);
  }

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
