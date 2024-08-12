'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist'
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import { useUser } from '@clerk/nextjs';

function RichDocument({ params }) {

    const ref = useRef();
    const { user } = useUser();
    let editor;
    let isFetched = false;

    const [documentOutput, setDocumentOutput] = useState([]);

    useEffect(() => {
        if (user) {
            InitEditor();
        }
    }, [user]);

    const saveDocument = () => {
        console.log('update');
        ref.current.save().then(async (outputData) => {
            const documentId = params?.documentId;

            if (!documentId) {
                console.error("Document ID is not provided.");
                return;
            }

            const docRef = doc(db, 'documentOutput', documentId);
            await updateDoc(docRef, {
                output: JSON.stringify(outputData),
                editedBy: user?.primaryEmailAddress?.emailAddress
            });
        }).catch((error) => {
            console.error("Error saving document:", error);
        });
    }

    const GetDocumentOutput = () => {
        const documentId = params?.documentId;

        if (!documentId) {
            console.error("Document ID is not provided.");
            return;
        }

        const unsubscribe = onSnapshot(doc(db, 'documentOutput', documentId),
            (doc) => {
                if (doc.data()?.editedBy !== user?.primaryEmailAddress?.emailAddress || isFetched === false) {
                    if (doc.data()?.editedBy) {
                        editor.render(JSON.parse(doc.data()?.output));
                    }
                    isFetched = true;
                }
            });

        return () => unsubscribe();  // Ensure to clean up the subscription when the component unmounts
    }

    const InitEditor = () => {
        if (!editor) {
            editor = new EditorJS({
                onChange: () => {
                    saveDocument();
                },
                onReady: () => {
                    GetDocumentOutput();
                },
                holder: 'editorjs',
                tools: {
                    header: Header,
                    delimiter: Delimiter,
                    paragraph: Paragraph,
                    alert: {
                        class: Alert,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+A',
                        config: {
                            alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                            defaultType: 'primary',
                            messagePlaceholder: 'Enter something',
                        }
                    },
                    table: Table,
                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L',
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },
                    checklist: {
                        class: Checklist,
                        shortcut: 'CMD+SHIFT+C',
                        inlineToolbar: true,
                    },
                    image: SimpleImage,
                    code: {
                        class: CodeTool,
                        shortcut: 'CMD+SHIFT+P'
                    }
                }
            });
            ref.current = editor;
        }
    }

    return (
        <div className='lg:-ml-80'>
            <div id='editorjs'></div>
        </div>
    );
}

export default RichDocument;
 