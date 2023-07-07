import {useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import browserLang from 'browser-lang';
import supportedLanguages from './config/supportedLanguages.js'
import { FormattedMessage, IntlProvider } from 'react-intl';

export default function App() {
    const defaultLocale = browserLang({
        languages: supportedLanguages,
        fallback: 'en'
    });

    const [locale, setLocale] = useState(defaultLocale);
    const [messages, setMessages] = useState(null);
    const [isLoadingLocale, setIsLoadingLocale] = useState(true);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_I18NEXUS_API_KEY;

        fetch(
            `https://api.i18nexus.com/project_resources/translations/${locale}/home?api_key=${apiKey}`
        )
            .then(response => response.json())
            .then(data => {
                setMessages(data);
                setIsLoadingLocale(false);
            });
    }, [locale]);

    if (isLoadingLocale) {
        return <div>Loading...</div>;
    }

    return (
        <IntlProvider locale={locale} messages={messages}>
            <div className="App">

                <select onChange={event => setLocale(event.target.value)}>
                    {supportedLanguages.map(locale => (
                        <option value={locale} key={locale}>
                            {locale}
                        </option>
                    ))}
                </select>

                <div>
                    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>

                <h1>Vite + React</h1>

                <p>
                    <FormattedMessage id="welcome_msg" values={{ name: 'Dorian' }} /> <br />
                    <FormattedMessage id="notifications" values={{ count: 1 }} />
                </p>

            </div>
        </IntlProvider>
    );
}
