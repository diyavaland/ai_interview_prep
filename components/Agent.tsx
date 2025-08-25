"use client";

import React from 'react'
import Image from "next/image";
import {cn} from "@/lib/utils";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const Agent = ({ userName }: AgentProps) => {
    const isSpeaking = true;
    const [callStatus, setCallStatus] = React.useState<CallStatus>(CallStatus.INACTIVE);
    const messages = [
        'What is your name?',
        'My name is Diya, Nice to meet you!',
    ]

    const lastMessage = messages[messages.length - 1];

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar relative">
                        <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className="object-cover" />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                <div className="card-border w-[600px]">

                <div className="card-content flex flex-col items-center">
                        <Image
                            src="/user-avatar.png"
                            alt="user avatar"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-[120px] h-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border w-[850px] mt-4">

                    <div className="transcript w-[850px]">
                        <p key={lastMessage} className={cn(
                            'transcript-opacity duration-500 opacity-0', 'animate-fadIn opacity-100')}>
                            {lastMessage}

                        </p>
                    </div>

                </div>
            )}

            <div className="w-full flex justify-center items-center mt-4">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        className="relative btn-call"
                        onClick={() => setCallStatus(CallStatus.CONNECTING)}
                    >
                        <span className={cn(
                            'absolute animate-ping rounded-full opacity-75',
                            callStatus !== CallStatus.CONNECTING && 'hidden'
                        )}/>
                        <span>
                          {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Call' : '...'}
                        </span>
                    </button>
                ) : (
                    <button
                        className="btn-disconnect"
                        onClick={() => setCallStatus(CallStatus.FINISHED)}
                    >
                        END
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent;
