import { hooks } from "@allaround/all-components";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { NOTIFICATION, PAYPAL_CLIENT_ID, SERVER_URL } from "./constants";

const { useNotification } = hooks;

type Props = {
  amount: number;
  credits: number;
  customerID: string | null;
  temporaryID: string | null;
};

async function createOrder(amount: number) {
  const response = await fetch(`${SERVER_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const order = await response.json();

  return order.id;
}

type OnApproveData = {
  creditsPending: number;
  creditsRemaining: number;
  customerID: string | null;
};

type OnApprove = {
  orderID: string;
  customerID: string | null;
  temporaryID: string | null;
};

async function onApprove({ orderID, customerID, temporaryID }: OnApprove) {
  const response = await fetch(`${SERVER_URL}/api/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderID, customerID, temporaryID }),
  });

  const orderData: OnApproveData = await response.json();

  return orderData;
}

const Paypal = ({ amount, credits, customerID, temporaryID }: Props) => {
  const { push: pushNotification, container: NotificationContainer } =
    useNotification({ position: "top" });

  const _onApprove = async ({ orderID }: { orderID: string }) => {
    try {
      await onApprove({
        orderID,
        customerID,
        temporaryID,
      });

      pushNotification(NOTIFICATION.RESPONSE_SUCCESS.name, {
        ...NOTIFICATION.RESPONSE_SUCCESS,
        heading: `You have successfully purchased ${credits} credits.`,
      });
    } catch (e) {
      pushNotification(
        NOTIFICATION.RESPONSE_CRITICAL.name,
        NOTIFICATION.RESPONSE_CRITICAL
      );
    }
  };

  const _onCreateOrder = async () => {
    try {
      const orderID = await createOrder(amount);

      return orderID;
    } catch (e) {
      pushNotification(
        NOTIFICATION.RESPONSE_CRITICAL.name,
        NOTIFICATION.RESPONSE_CRITICAL
      );
    }
  };

  return (
    <>
      <NotificationContainer />
      <PayPalScriptProvider
        options={{
          clientId: PAYPAL_CLIENT_ID ?? "",
          components: "buttons",
          currency: "USD",
        }}
      >
        <PayPalButtons
          disabled={false}
          forceReRender={[amount, customerID]}
          fundingSource={undefined}
          createOrder={_onCreateOrder}
          onApprove={_onApprove}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default Paypal;
