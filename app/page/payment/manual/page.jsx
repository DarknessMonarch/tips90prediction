"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/app/styles/manualPayment.module.css";

export default function ManualPayment() {
  const searchParams = useSearchParams();

  const [paymentDetails, setPaymentDetails] = useState(null);
  const countryCode = searchParams.get("country") || "";
  const price = searchParams.get("price") || "";

  useEffect(() => {
    const getPaymentDetails = () => {
      const africanPayments = {
        ke: {
          currency: "KSH",
          method: "MPESA",
          name: "Hannington Omondi",
          phone: "0743-247-861",
          description: "Send payment via MPESA",
        },
        ng: {
          currency: "Naira",
          method: "Western Union",
          name: "Charisma Odemba",
          phone: "+254746033465",
          description: "Send payment via Western Union",
        },
        gh: {
          currency: "Cedis",
          method: "Vodaphone cash",
          name: "Godfred Boateng",
          phone: "0501523531",
          description: "Send payment via Mobile Money(MOMO)",
        },
        tz: {
          currency: "TZS",
          method: "M-PESA Tanzania",
          name: "Charisma Odemba",
          phone: "0743-247-861",
          description: "Send payment via M-PESA Tanzania",
        },
        ug: {
          currency: "UGX",
          method: "Mobile Money",
          name: "Charisma Odemba",
          phone: "0743-247-861",
          description: "Dial *165# or via MPESA",
        },
        sa: {
          currency: "ZAR",
          method: "Mobile Money",
          name: "Charisma Odemba",
          phone: "0743-247-861",
          description: "Send payment via Mobile Money",
        },
        zm: {
          currency: "ZMW",
          method: "Airtel Money",
          name: "Collins Odongo",
          phone: "(+254)780-077-873",
          description: "*778# or use Airtel Money mobile app",
        },
        cm: {
          currency: "XAF",
          method: "Western Union",
          name: "Charisma Odemba",
          phone: "+254746033465",
          description: "Send payment via Western Union",
        },
        za: {
          currency: "ZAR",
          method: "PayPal",
          name: "collinsodongo007@gmail.com",
          phone: "",
          description: "Send payment via PayPal",
        },
        rw: {
          currency: "RWF",
          method: "MTN Line to MPESA Kenya",
          name: "Collins Odongo",
          phone: "(+254)780-077-873",
          description: "Dial *830# to send payment via MTN line to Kenya",
        },
        mw: {
          currency: "MWK",
          method: "Airtel Money",
          name: "Collins Odongo",
          phone: "(+254)780-077-873",
          description: "Use Airtel Money app, select international transfer and choose Kenya",
        },
   
      };

      const defaultPayment = {
        currency: "USD",
        methods: [
          {
            name: "PAYPAL",
            contactName: "Collins Odongo",
            contactInfo: "collinsodongo007@gmail.com",
            description: "Send payment via PayPal",
          },
          {
            name: "BITCOIN",
            contactName: "comming soon",
            contactInfo: "comming soon",
            description: "comming soon",
          },
        ],
      };

      return africanPayments[countryCode] || defaultPayment;
    };

    setPaymentDetails(getPaymentDetails());
  }, [countryCode]);

  if (!paymentDetails) return null;

  return (
    <div className={styles.manualContainer}>
      <h3>Manual Payment</h3>

      {paymentDetails.methods ? (
        <>
          {paymentDetails.methods.map((method, index) => (
            <div key={index} className={styles.methodItem}>
              <h4 className={styles.methodName}>{method.name}</h4>
              <ul className={styles.instructionsList}>
                <li>
                  Name: <span>{method.contactName}</span>{" "}
                </li>
                <li>
                  Email: <span>{method.contactInfo}</span>{" "}
                </li>
                <li>
                  Amount to pay: <span>{price}</span>{" "}
                </li>
                <li>{method.description}</li>
              </ul>
            </div>
          ))}
        </>
      ) : (
        <ul className={styles.instructionsList}>
          <li>
            Name: <span>{paymentDetails.name}</span>
          </li>
          <li>
            Phone: <span>{paymentDetails.phone}</span>{" "}
          </li>
          <li>
            Amount to pay: <span>{price}</span>{" "}
          </li>
          <li>{paymentDetails.description}</li>
        </ul>
      )}
   
    </div>
  );
}