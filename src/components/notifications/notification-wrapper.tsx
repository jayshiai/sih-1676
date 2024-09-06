import { cookies } from "next/headers";

import { Mail } from "./mail";
import { ConfigProvider } from "./notification-provider";
export default function NotificationPage({ mails, severityData }: any) {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="flex-col flex">
        <ConfigProvider>
          <Mail
            mails={mails}
            severityData={severityData}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          />
        </ConfigProvider>
      </div>
    </>
  );
}
