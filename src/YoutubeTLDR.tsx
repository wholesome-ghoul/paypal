import { Container, Heading, hooks } from "@allaround/all-components";

import Paypal from "./Paypal";
import styles from "./YoutubeTLDR.module.css";
import { useEffect, useState } from "react";

const { useNotification } = hooks;

type $Payload = {
  service: string;
  amount: number;
  credits: number;
  customerID: string | null;
  temporaryID: string | null;
};

const YoutubeTLDR = () => {
  const [payload, setPayload] = useState<$Payload>({
    service: "youtube-tldr",
    amount: 10,
    credits: 500,
    customerID: null,
    temporaryID: null,
  });
  const { push: pushNotification, container: NotificationContainer } =
    useNotification({ position: "top" });

  useEffect(() => {
    try {
      const _payload = window.location.href.split("?")[1].split("=")[1];
      const uriDecodedPaylaod = decodeURIComponent(_payload);
      const b64DecodedPaylaod = atob(uriDecodedPaylaod);
      const parsedPayload = JSON.parse(b64DecodedPaylaod);

      setPayload(parsedPayload);
    } catch (e) {
      pushNotification("error", {
        variant: "alert",
        heading: "Something went wrong",
      });
    }
  }, []);

  return (
    <>
      <NotificationContainer />
      <Container className={styles.container} noGrid flex>
        <Heading.h2 className={styles.heading}>
          Choose Your Payment Method
        </Heading.h2>

        <Container className={styles.paypalContainer} noGrid>
          <Paypal
            amount={payload.amount}
            customerID={payload.customerID}
            temporaryID={payload.temporaryID}
            credits={payload.credits}
          />
        </Container>
      </Container>
    </>
  );
};

export default YoutubeTLDR;
