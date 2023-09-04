import { Button, Container, Heading, Text } from "@allaround/all-components";

import Paypal from "./Paypal";
import styles from "./YoutubeTLDR.module.css";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    try {
      const _payload = window.location.href.split("?")[1].split("=")[1];
      const uriDecodedPaylaod = decodeURIComponent(_payload);
      const b64DecodedPaylaod = atob(uriDecodedPaylaod);
      const parsedPayload = JSON.parse(b64DecodedPaylaod);

      setPayload(parsedPayload);
    } catch (e) {}
  }, []);

  const paypalMe = () => {
    const url = "https://paypal.me/wholesomeghoul?country.x=GE&locale.x=en_US";
    window.open(url, "_blank");
  };

  return (
    <>
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

        <Container className={styles.donateContainer} noGrid flex>
          <Heading.h5 className={styles.heading}>
            Or if you just want to donate
          </Heading.h5>

          <Button onClick={paypalMe}>Donate</Button>
          <Text className={styles.donateText}>
            First $140 will always go to my goodest and bestest doggos, L and B.
            Remaining funds (if any) will go towards my student loans. Thank
            you, I appreciate it very much.
          </Text>
        </Container>
      </Container>
    </>
  );
};

export default YoutubeTLDR;
