import Image from "next/image";
import Link from "next/link";
import data from "./../data.json";
import "./country.css"

async function Country({ params }: { params: Promise<{ nCode: string }> }) {
    const code = (await params).nCode;
    const country = data.find(d => d.numericCode === code);

    // Function used to return formatted string with country's currencies or languages
    function format(array: { name: string }[] | undefined): string {
        if (array === undefined) return "undefined";
        let languages: string = "";
        array.forEach((el, index) => {
            languages += el.name;
            if (index < array.length - 1) {
                languages += ", ";
            }
        });
        return languages;
    }

    function borders(bor: string[] | undefined): { numericCode: string, name: string }[] {
        if (bor === undefined) return [];
        const countries: { numericCode: string, name: string }[] = [];
        bor.forEach(c => {
            const coun: { numericCode: string, name: string } | undefined = data.find(d => d.alpha3Code === c);
            if (coun) {
                countries.push(coun);
            }
        });
        return countries;
    }

    const bor: { numericCode: string, name: string }[] = borders(country?.borders);

    return (
        <main className="c-main">
            <div className="back">
                <Link href={"/"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                    Back
                </Link>
            </div>
            <div className="info">
                <div className="image">
                    <Image className="country-page" src={country!.flags.svg} alt={country!.name} width={200} height={150} />
                </div>
                <div className="text">
                    <h2>{country?.name}</h2>
                    <div className="more-text">
                        <ul>
                            <li><p><strong>Native Name:</strong> {country?.nativeName}</p></li>
                            <li><p><strong>Population:</strong> {country?.population.toLocaleString()}</p></li>
                            <li><p><strong>Region:</strong> {country?.region}</p></li>
                            <li><p><strong>Sub Region:</strong> {country?.subregion}</p></li>
                            <li><p><strong>Capital:</strong> {country?.capital}</p></li>
                        </ul>
                        <ul>
                            <li><p><strong>Top Level Domain:</strong> {country?.topLevelDomain}</p></li>
                            <li><p><strong>Currencies:</strong> {format(country?.currencies)}</p></li>
                            <li><p><strong>Languages:</strong> {format(country?.languages)}</p></li>
                        </ul>
                    </div>
                    <div className="border">
                        <p><strong>Border Countries:</strong></p>
                        {bor.map(it =>
                            <Link className="border-country" key={it.numericCode} href={"./" + it.numericCode}>
                                <span>{it.name}</span>
                            </Link>)}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Country;
