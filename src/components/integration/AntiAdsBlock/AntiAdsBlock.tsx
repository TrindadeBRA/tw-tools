"use client"

import { useEffect, useState } from "react";
import { DetectAdblock } from "@scthakuri/adblock-detector";
import AntiAdsModal from "./AntiAdsModal";
import GaEvent from "./GaEvent";

export default function AntiAdsBlock() {

    const [startDetect, setStartDetect] = useState(true);
    const [detected, setDetected] = useState(false);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (startDetect) {
            DetectAdblock((enable) => {
                setStartDetect(false);
                setDetected(enable);
                if (enable) {
                    setShowModal(true);
                }
            });
        }
    }, [startDetect]);

    useEffect(() => {
        if (detected) {
            GaEvent();
        }
    }, [detected]);


    return (
        <div>
            {showModal && (
                <AntiAdsModal
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}