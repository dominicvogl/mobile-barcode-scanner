import HeadingOne from "@/components/headlines/h1";
import HeadingTwo from "@/components/headlines/h2";

export const metadata = {
	title: "Impressum - EAN Code Scanner",
	description: "Impressum und rechtliche Hinweise für den EAN Code Scanner",
};

export default function Impressum() {
	return (
		<>
			<HeadingOne>Impressum</HeadingOne>

			<p>Dominic Vogl<br />
				Catalyst-Interactive<br />
				Tannenweg 14<br />
				95445 Bayreuth</p>

			<HeadingTwo>Kontakt</HeadingTwo>
			<p>Telefon: +49 (0) 171 83 87 615<br />
				E-Mail: dominic.vogl@syncshelf.app</p>

			<HeadingTwo>Umsatzsteuer-ID</HeadingTwo>
			<p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
				DE277802597</p>
		</>
	)
}
