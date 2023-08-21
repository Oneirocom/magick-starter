import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState } from "react";

export default function testPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async (): Promise<any> => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://172.21.83.187:3030/api?apiKey=aa79089c70d5e4192932c0f08fa3c888&agentId=e9532d52-3657-4e46-ab84-99747ce3c55d&content=${encodeURIComponent(
          `write a 5 paragraph essay on the topic of your choice`
        )}`,

        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SUWUnYMxRTxIgGD1.lCzhMnTVeWOBFBzDs4_ft6UCZIVhfk9VSw18-SNzSJjXB4yqwi7z3XJEO9FwbSybFkAjSoFHwYnizYhDsrouDn1xLS7Dqzwnn4I-V1-L0mXcmKXRAS8D1PQzR88CDsk-LIqkcZkkxQ8aoGmyVcKwAmlnAdYpPUEbJ7E3DEBCvA4UbY1iqdYmCWdD7NWeR_IDsWFMKP3jEqp3HPMJbbTitCb1_W-G0gnZ6cokK_JH9tpgbjAoWe0KRQB2Dr3B22-1qa9cPV8W13she2q_RR6SeTAM9iqwzufvuIu2b3Lu0fypQpcV4JyrwCawkZcjsdGQqateftfAQNYzUeSXVzZdWSZJOwHtDHpIMKh_SugqS3ASNrN2gqUEwvY2SOe60h__2ljLsSc.9qWEv3VNEKFpc6zmJv4n0A`,
          },
        }
      );

      const data = await response.json();
      console.log("DATA", data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("ERROR", error);
    }
  };

  return (
    <div className="h-48 w-48">
      {loading && <p>loading</p>}

      <button className="btn btn-ghost" onClick={fetchDocuments}>
        Call
      </button>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      data: "",
    },
  };
}
