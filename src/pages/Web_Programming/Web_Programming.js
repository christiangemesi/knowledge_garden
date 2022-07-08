import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import webpr from './webpr.md';
import Basic from './docs/Basics.md';
import Canvas_KeyEvents_GameLoop from './docs/Canvas_KeyEvents_GameLoop.md';
import Console_logs from './docs/Console_logs.md';
import LamdaCalculus from './docs/LambdaCalculus.md';


export const Web_Programming = () => {
    return (
        <div className='reports'>
            <h1>Web_Programming</h1>
        </div>
    );
};

export const ReportsOne = () => {

    const markdown = PrettyMarkdown(Basic)

    return (
        <div className='reports'>
            <ReactMarkdown children={markdown} />
        </div>
    );
};

export const ReportsTwo = () => {
    const markdown = PrettyMarkdown(Canvas_KeyEvents_GameLoop)

    return (
        <div className='reports'>
            <ReactMarkdown children={markdown} />
        </div>
    );
};

export const ReportsThree = () => {
    const markdown = PrettyMarkdown(Console_logs)

    return (
        <div className='reports'>
            <ReactMarkdown children={markdown} />
        </div>
    );
};

export const ReportFour = () => {
    const markdown = PrettyMarkdown(LamdaCalculus)

    return (
        <div className='reports'>
            <ReactMarkdown children={markdown} />
        </div>
    );
};

export const ReportAllTheRest = () => {
    const markdown = PrettyMarkdown(webpr)

    return (
        <div className='reports'>
            <ReactMarkdown children={markdown} />
        </div>
    );
};

function PrettyMarkdown(markdownFile){
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(markdownFile)
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, [markdownFile]);

    return content;
}
