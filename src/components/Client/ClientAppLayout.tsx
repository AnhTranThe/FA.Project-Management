/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ClientAppTopbar from "./ClientAppTopbar";


export default function ClientAppLayout(props: any) {


    return (
        <React.Fragment>

            <ClientAppTopbar />
            <div className="layout-main">{props.children}</div>


        </React.Fragment>
    );
}
