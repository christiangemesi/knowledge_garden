import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import webpr from './webpr.md';

export const Reports = () => {
    return (
        <div className='reports'>
            <h1>Reports</h1>
        </div>
    );
};

export const ReportsOne = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(webpr)
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);


    const input ='# This is a header \n And this is a paragraph'

    return (
        <div className='report'>
            <ReactMarkdown children={content} />
        </div>
    );
};

export const ReportsTwo = () => {
    return (
        <div className='reports'>
            <h1>Reports/reports2</h1>
        </div>
    );
};

export const ReportsThree = () => {
    return (
        <div className='reports'>
            <h1>Reports/reports3</h1>
        </div>
    );
};
