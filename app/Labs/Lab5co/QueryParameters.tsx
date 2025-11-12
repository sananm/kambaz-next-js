'use client';
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function QueryParameters() {
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);

    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl
                id="wd-query-parameter-a"
                className="mb-2"
                value={String(a)}
                type="number"
                onChange={(e) => setA(Number(e.target.value) || 0)}
            />
            <FormControl
                id="wd-query-parameter-b"
                className="mb-2"
                value={String(b)}
                type="number"
                onChange={(e) => setB(Number(e.target.value) || 0)}
            />
            <button
                id="wd-query-parameter-add"
                type="button"
                onClick={() =>
                    (window.location.href = `${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`)
                }
            >
                Add {a} + {b}
            </button>
            <button
                id="wd-query-parameter-subtract"
                type="button"
                onClick={() =>
                    (window.location.href = `${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`)
                }
            >
                Subtract {a} - {b}
            </button>

            <button
                id="wd-query-parameter-multiply"
                type="button"
                onClick={() =>
                    (window.location.href = `${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`)
                }
            >
                Multiply {a} * {b}
            </button>

            <button
                id="wd-query-parameter-divide"
                type="button"
                onClick={() =>
                    (window.location.href = `${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`)
                }
            >
                Divide {a} / {b}
            </button>
            
            <hr />
        </div>
    );
}