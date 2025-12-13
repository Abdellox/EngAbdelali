// Digital Services Data - 100+ Countries with All Service Categories
const countriesData = [
    // MOROCCO - PRIMARY COUNTRY
    {
        name: "Morocco", nameAr: "المغرب", flag: "🇲🇦", region: "North Africa", featured: true,
        services: [
            { name: "e-Government Portal", url: "https://www.service-public.ma", category: "government" },
            { name: "Digital Identity (CIN)", url: "https://www.cnie.ma", category: "government" },
            { name: "Tax Services", url: "https://www.tax.gov.ma", category: "government" },
            { name: "CNSS Social Security", url: "https://www.cnss.ma", category: "government" },
            { name: "Attijariwafa Bank", url: "https://www.attijariwafabank.com", category: "banking" },
            { name: "BMCE Bank", url: "https://www.bmcebank.ma", category: "banking" },
            { name: "CIH Bank", url: "https://www.cih.co.ma", category: "banking" },
            { name: "ONEE Electricity", url: "https://www.onee.ma", category: "utilities" },
            { name: "Lydec Utilities", url: "https://www.lydec.ma", category: "utilities" },
            { name: "Maroc Telecom", url: "https://www.iam.ma", category: "internet" },
            { name: "Orange Morocco", url: "https://www.orange.ma", category: "internet" },
            { name: "Inwi", url: "https://www.inwi.ma", category: "internet" },
            { name: "Glovo Food Delivery", url: "https://www.glovoapp.com/ma", category: "food" },
            { name: "Jumia Food", url: "https://food.jumia.ma", category: "food" },
            { name: "Careem", url: "https://www.careem.com", category: "transport" },
            { name: "ONCF Trains", url: "https://www.oncf.ma", category: "transport" },
            { name: "Ministry of Health", url: "https://www.sante.gov.ma", category: "health" },
            { name: "Ministry of Education", url: "https://www.men.gov.ma", category: "education" }
        ]
    },
    
    // SAUDI ARABIA
    {
        name: "Saudi Arabia", nameAr: "السعودية", flag: "🇸🇦", region: "Middle East", featured: true,
        services: [
            { name: "Absher Platform", url: "https://www.absher.sa", category: "government" },
            { name: "Muqeem Services", url: "https://www.muqeem.sa", category: "government" },
            { name: "Qiwa Employment", url: "https://www.qiwa.sa", category: "government" },
            { name: "Al Rajhi Bank", url: "https://www.alrajhibank.com.sa", category: "banking" },
            { name: "Saudi National Bank", url: "https://www.alahli.com", category: "banking" },
            { name: "Saudi Electricity", url: "https://www.se.com.sa", category: "utilities" },
            { name: "STC Telecom", url: "https://www.stc.com.sa", category: "internet" },
            { name: "Mobily", url: "https://www.mobily.com.sa", category: "internet" },
            { name: "HungerStation", url: "https://www.hungerstation.com", category: "food" },
            { name: "Jahez", url: "https://www.jahez.sa", category: "food" },
            { name: "Careem", url: "https://www.careem.com", category: "transport" },
            { name: "Uber Saudi", url: "https://www.uber.com/sa", category: "transport" },
            { name: "Seha Health", url: "https://www.seha.sa", category: "health" }
        ]
    },
    
    // UNITED ARAB EMIRATES
    {
        name: "United Arab Emirates", nameAr: "الإمارات", flag: "🇦🇪", region: "Middle East", featured: true,
        services: [
            { name: "UAE Pass", url: "https://www.uaepass.ae", category: "government" },
            { name: "Federal Portal", url: "https://u.ae", category: "government" },
            { name: "Emirates NBD", url: "https://www.emiratesnbd.com", category: "banking" },
            { name: "ADIB Bank", url: "https://www.adib.ae", category: "banking" },
            { name: "DEWA Electricity", url: "https://www.dewa.gov.ae", category: "utilities" },
            { name: "Etisalat", url: "https://www.etisalat.ae", category: "internet" },
            { name: "du Telecom", url: "https://www.du.ae", category: "internet" },
            { name: "Talabat", url: "https://www.talabat.com", category: "food" },
            { name: "Deliveroo UAE", url: "https://deliveroo.ae", category: "food" },
            { name: "Careem", url: "https://www.careem.com", category: "transport" },
            { name: "Dubai Health Authority", url: "https://www.dha.gov.ae", category: "health" }
        ]
    },
    
    // EGYPT
    {
        name: "Egypt", nameAr: "مصر", flag: "🇪🇬", region: "North Africa", featured: true,
        services: [
            { name: "Egypt Digital Government", url: "https://www.egypt.gov.eg", category: "government" },
            { name: "Tax Authority", url: "https://www.eta.gov.eg", category: "government" },
            { name: "National Bank of Egypt", url: "https://www.nbe.com.eg", category: "banking" },
            { name: "Banque Misr", url: "https://www.banquemisr.com", category: "banking" },
            { name: "Egyptian Electricity", url: "https://www.moee.gov.eg", category: "utilities" },
            { name: "Vodafone Egypt", url: "https://www.vodafone.com.eg", category: "internet" },
            { name: "Orange Egypt", url: "https://www.orange.eg", category: "internet" },
            { name: "Talabat Egypt", url: "https://www.talabat.com/egypt", category: "food" },
            { name: "Uber Egypt", url: "https://www.uber.com/eg", category: "transport" },
            { name: "Ministry of Health", url: "https://www.mohp.gov.eg", category: "health" }
        ]
    },
    
    // JORDAN
    {
        name: "Jordan", nameAr: "الأردن", flag: "🇯🇴", region: "Middle East",
        services: [
            { name: "Sanad e-Government", url: "https://www.sanad.gov.jo", category: "government" },
            { name: "Arab Bank", url: "https://www.arabbank.jo", category: "banking" },
            { name: "Jordan Electricity", url: "https://www.nepco.com.jo", category: "utilities" },
            { name: "Zain Jordan", url: "https://www.jo.zain.com", category: "internet" },
            { name: "Talabat Jordan", url: "https://www.talabat.com/jordan", category: "food" },
            { name: "Careem Jordan", url: "https://www.careem.com", category: "transport" }
        ]
    },
    
    // QATAR
    {
        name: "Qatar", nameAr: "قطر", flag: "🇶🇦", region: "Middle East",
        services: [
            { name: "Hukoomi Portal", url: "https://portal.www.gov.qa", category: "government" },
            { name: "Qatar National Bank", url: "https://www.qnb.com", category: "banking" },
            { name: "Kahramaa Utilities", url: "https://www.km.com.qa", category: "utilities" },
            { name: "Ooredoo Qatar", url: "https://www.ooredoo.qa", category: "internet" },
            { name: "Talabat Qatar", url: "https://www.talabat.com/qatar", category: "food" },
            { name: "Careem Qatar", url: "https://www.careem.com", category: "transport" }
        ]
    },
    
    // KUWAIT
    {
        name: "Kuwait", nameAr: "الكويت", flag: "🇰🇼", region: "Middle East",
        services: [
            { name: "Kuwait Government Online", url: "https://www.e.gov.kw", category: "government" },
            { name: "National Bank of Kuwait", url: "https://www.nbk.com", category: "banking" },
            { name: "MEW Utilities", url: "https://www.mew.gov.kw", category: "utilities" },
            { name: "Zain Kuwait", url: "https://www.kw.zain.com", category: "internet" },
            { name: "Talabat Kuwait", url: "https://www.talabat.com/kuwait", category: "food" },
            { name: "Careem Kuwait", url: "https://www.careem.com", category: "transport" }
        ]
    },
    
    // BAHRAIN
    {
        name: "Bahrain", nameAr: "البحرين", flag: "🇧🇭", region: "Middle East",
        services: [
            { name: "Bahrain eGovernment", url: "https://www.bahrain.bh", category: "government" },
            { name: "Ahli United Bank", url: "https://www.ahliunited.com", category: "banking" },
            { name: "EWA Utilities", url: "https://www.ewa.bh", category: "utilities" },
            { name: "Batelco", url: "https://www.batelco.com", category: "internet" },
            { name: "Talabat Bahrain", url: "https://www.talabat.com/bahrain", category: "food" },
            { name: "Careem Bahrain", url: "https://www.careem.com", category: "transport" }
        ]
    },
    
    // OMAN
    {
        name: "Oman", nameAr: "عمان", flag: "🇴🇲", region: "Middle East",
        services: [
            { name: "Oman eGovernment", url: "https://www.oman.om", category: "government" },
            { name: "Bank Muscat", url: "https://www.bankmuscat.com", category: "banking" },
            { name: "PAEW Utilities", url: "https://www.paew.gov.om", category: "utilities" },
            { name: "Omantel", url: "https://www.omantel.om", category: "internet" },
            { name: "Talabat Oman", url: "https://www.talabat.com/oman", category: "food" },
            { name: "Careem Oman", url: "https://www.careem.com", category: "transport" }
        ]
    },
    
    // LEBANON
    {
        name: "Lebanon", nameAr: "لبنان", flag: "🇱🇧", region: "Middle East",
        services: [
            { name: "Lebanon Government", url: "https://www.lebanon.gov.lb", category: "government" },
            { name: "Bank Audi", url: "https://www.bankaudi.com.lb", category: "banking" },
            { name: "EDL Electricity", url: "https://www.edl.gov.lb", category: "utilities" },
            { name: "Alfa Telecom", url: "https://www.alfa.com.lb", category: "internet" },
            { name: "Toters Delivery", url: "https://www.totersapp.com", category: "food" },
            { name: "Uber Lebanon", url: "https://www.uber.com/lb", category: "transport" }
        ]
    },
    
    // TUNISIA
    {
        name: "Tunisia", nameAr: "تونس", flag: "🇹🇳", region: "North Africa",
        services: [
            { name: "Tunisia eGovernment", url: "https://www.tunisie.gov.tn", category: "government" },
            { name: "Banque de Tunisie", url: "https://www.bt.com.tn", category: "banking" },
            { name: "STEG Utilities", url: "https://www.steg.com.tn", category: "utilities" },
            { name: "Tunisie Telecom", url: "https://www.tunisietelecom.tn", category: "internet" },
            { name: "Glovo Tunisia", url: "https://www.glovoapp.com/tn", category: "food" },
            { name: "Bolt Tunisia", url: "https://bolt.eu", category: "transport" }
        ]
    },
    
    // ALGERIA
    {
        name: "Algeria", nameAr: "الجزائر", flag: "🇩🇿", region: "North Africa",
        services: [
            { name: "Algeria eGovernment", url: "https://www.service-public.dz", category: "government" },
            { name: "BNA Bank", url: "https://www.bna.dz", category: "banking" },
            { name: "Sonelgaz Utilities", url: "https://www.sonelgaz.dz", category: "utilities" },
            { name: "Algérie Télécom", url: "https://www.algerietelecom.dz", category: "internet" },
            { name: "Yassir", url: "https://www.yassir.com", category: "food" },
            { name: "Yassir Transport", url: "https://www.yassir.com", category: "transport" }
        ]
    },
    
    // LIBYA
    {
        name: "Libya", nameAr: "ليبيا", flag: "🇱🇾", region: "North Africa",
        services: [
            { name: "Libya Government", url: "https://www.pm.gov.ly", category: "government" },
            { name: "Jumhouria Bank", url: "https://www.jbank.ly", category: "banking" },
            { name: "GECOL Electricity", url: "https://www.gecol.ly", category: "utilities" },
            { name: "Libya Telecom", url: "https://www.ltt.ly", category: "internet" }
        ]
    },
    
    // IRAQ
    {
        name: "Iraq", nameAr: "العراق", flag: "🇮🇶", region: "Middle East",
        services: [
            { name: "Iraq eGovernment", url: "https://www.egov.gov.iq", category: "government" },
            { name: "Rafidain Bank", url: "https://www.rafidain-bank.gov.iq", category: "banking" },
            { name: "Ministry of Electricity", url: "https://www.moelc.gov.iq", category: "utilities" },
            { name: "Zain Iraq", url: "https://www.iq.zain.com", category: "internet" },
            { name: "Talabat Iraq", url: "https://www.talabat.com/iraq", category: "food" }
        ]
    },
    
    // SYRIA
    {
        name: "Syria", nameAr: "سوريا", flag: "🇸🇾", region: "Middle East",
        services: [
            { name: "Syria Government", url: "https://www.syria.gov.sy", category: "government" },
            { name: "Commercial Bank of Syria", url: "https://www.cbs-bank.sy", category: "banking" },
            { name: "Syrian Telecom", url: "https://www.ste.gov.sy", category: "internet" }
        ]
    },
    
    // PALESTINE
    {
        name: "Palestine", nameAr: "فلسطين", flag: "🇵🇸", region: "Middle East",
        services: [
            { name: "Palestine Government", url: "https://www.gov.ps", category: "government" },
            { name: "Bank of Palestine", url: "https://www.bankofpalestine.com", category: "banking" },
            { name: "Jawwal Telecom", url: "https://www.jawwal.ps", category: "internet" },
            { name: "Talabat Palestine", url: "https://www.talabat.com", category: "food" }
        ]
    },
    
    // YEMEN
    {
        name: "Yemen", nameAr: "اليمن", flag: "🇾🇪", region: "Middle East",
        services: [
            { name: "Yemen Government", url: "https://www.yemen.gov.ye", category: "government" },
            { name: "Yemen Bank", url: "https://www.cby.gov.ye", category: "banking" },
            { name: "Yemen Mobile", url: "https://www.yemenmobile.com.ye", category: "internet" }
        ]
    },
    
    // SUDAN
    {
        name: "Sudan", nameAr: "السودان", flag: "🇸🇩", region: "North Africa",
        services: [
            { name: "Sudan Government", url: "https://www.sudan.gov.sd", category: "government" },
            { name: "Bank of Khartoum", url: "https://www.bokgroup.com", category: "banking" },
            { name: "Sudani Telecom", url: "https://www.sudani.sd", category: "internet" }
        ]
    },
    
    // MAURITANIA
    {
        name: "Mauritania", nameAr: "موريتانيا", flag: "🇲🇷", region: "West Africa",
        services: [
            { name: "Mauritania Government", url: "https://www.mauritania.mr", category: "government" },
            { name: "Banque Centrale", url: "https://www.bcm.mr", category: "banking" },
            { name: "Mauritel", url: "https://www.mauritel.mr", category: "internet" }
        ]
    },
    
    // SOMALIA
    {
        name: "Somalia", nameAr: "الصومال", flag: "🇸🇴", region: "East Africa",
        services: [
            { name: "Somalia Government", url: "https://www.somalia.gov.so", category: "government" },
            { name: "Hormuud Telecom", url: "https://www.hormuud.com", category: "internet" },
            { name: "Somtel", url: "https://www.somtel.com", category: "internet" }
        ]
    },
    
    // DJIBOUTI
    {
        name: "Djibouti", flag: "🇩🇯", region: "East Africa",
        services: [
            { name: "Djibouti Government", url: "https://www.presidence.dj", category: "government" },
            { name: "Djibouti Telecom", url: "https://www.djiboutitelecom.dj", category: "internet" }
        ]
    },
    
    // COMOROS
    {
        name: "Comoros", flag: "🇰🇲", region: "East Africa",
        services: [
            { name: "Comoros Government", url: "https://www.beit-salam.km", category: "government" },
            { name: "Comores Telecom", url: "https://www.comorestelecom.km", category: "internet" }
        ]
    },
    
    // EUROPEAN COUNTRIES
    
    // FRANCE
    {
        name: "France", flag: "🇫🇷", region: "Europe",
        services: [
            { name: "Service-Public.fr", url: "https://www.service-public.fr", category: "government" },
            { name: "Impots.gouv.fr", url: "https://www.impots.gouv.fr", category: "government" },
            { name: "BNP Paribas", url: "https://www.bnpparibas.com", category: "banking" },
            { name: "Crédit Agricole", url: "https://www.credit-agricole.fr", category: "banking" },
            { name: "EDF Energy", url: "https://www.edf.fr", category: "utilities" },
            { name: "Orange France", url: "https://www.orange.fr", category: "internet" },
            { name: "Uber Eats France", url: "https://www.ubereats.com/fr", category: "food" },
            { name: "Deliveroo France", url: "https://deliveroo.fr", category: "food" },
            { name: "SNCF Trains", url: "https://www.sncf.com", category: "transport" },
            { name: "Ameli Health", url: "https://www.ameli.fr", category: "health" }
        ]
    },
    
    // GERMANY
    {
        name: "Germany", flag: "🇩🇪", region: "Europe",
        services: [
            { name: "BundID", url: "https://id.bund.de", category: "government" },
            { name: "Deutsche Bank", url: "https://www.deutsche-bank.de", category: "banking" },
            { name: "Commerzbank", url: "https://www.commerzbank.de", category: "banking" },
            { name: "E.ON Energy", url: "https://www.eon.de", category: "utilities" },
            { name: "Deutsche Telekom", url: "https://www.telekom.de", category: "internet" },
            { name: "Lieferando", url: "https://www.lieferando.de", category: "food" },
            { name: "Uber Eats Germany", url: "https://www.ubereats.com/de", category: "food" },
            { name: "Deutsche Bahn", url: "https://www.bahn.de", category: "transport" }
        ]
    },
    
    // UNITED KINGDOM
    {
        name: "United Kingdom", flag: "🇬🇧", region: "Europe",
        services: [
            { name: "GOV.UK", url: "https://www.gov.uk", category: "government" },
            { name: "HMRC Tax", url: "https://www.gov.uk/government/organisations/hm-revenue-customs", category: "government" },
            { name: "Barclays Bank", url: "https://www.barclays.co.uk", category: "banking" },
            { name: "HSBC UK", url: "https://www.hsbc.co.uk", category: "banking" },
            { name: "British Gas", url: "https://www.britishgas.co.uk", category: "utilities" },
            { name: "BT Telecom", url: "https://www.bt.com", category: "internet" },
            { name: "Deliveroo UK", url: "https://deliveroo.co.uk", category: "food" },
            { name: "Just Eat UK", url: "https://www.just-eat.co.uk", category: "food" },
            { name: "National Rail", url: "https://www.nationalrail.co.uk", category: "transport" },
            { name: "NHS Digital", url: "https://www.nhs.uk", category: "health" }
        ]
    },
    
    // SPAIN
    {
        name: "Spain", flag: "🇪🇸", region: "Europe",
        services: [
            { name: "Sede Electrónica", url: "https://sede.administracion.gob.es", category: "government" },
            { name: "Santander Bank", url: "https://www.bancosantander.es", category: "banking" },
            { name: "BBVA", url: "https://www.bbva.es", category: "banking" },
            { name: "Iberdrola Energy", url: "https://www.iberdrola.es", category: "utilities" },
            { name: "Movistar", url: "https://www.movistar.es", category: "internet" },
            { name: "Glovo Spain", url: "https://www.glovoapp.com/es", category: "food" },
            { name: "Just Eat Spain", url: "https://www.just-eat.es", category: "food" },
            { name: "Renfe Trains", url: "https://www.renfe.com", category: "transport" }
        ]
    },
    
    // ITALY
    {
        name: "Italy", flag: "🇮🇹", region: "Europe",
        services: [
            { name: "Italia.it", url: "https://www.italia.it", category: "government" },
            { name: "UniCredit", url: "https://www.unicredit.it", category: "banking" },
            { name: "Intesa Sanpaolo", url: "https://www.intesasanpaolo.com", category: "banking" },
            { name: "Enel Energy", url: "https://www.enel.it", category: "utilities" },
            { name: "TIM Telecom", url: "https://www.tim.it", category: "internet" },
            { name: "Glovo Italy", url: "https://www.glovoapp.com/it", category: "food" },
            { name: "Just Eat Italy", url: "https://www.justeat.it", category: "food" },
            { name: "Trenitalia", url: "https://www.trenitalia.com", category: "transport" }
        ]
    },
    
    // NETHERLANDS
    {
        name: "Netherlands", flag: "🇳🇱", region: "Europe",
        services: [
            { name: "Overheid.nl", url: "https://www.overheid.nl", category: "government" },
            { name: "ING Bank", url: "https://www.ing.nl", category: "banking" },
            { name: "ABN AMRO", url: "https://www.abnamro.nl", category: "banking" },
            { name: "Eneco Energy", url: "https://www.eneco.nl", category: "utilities" },
            { name: "KPN Telecom", url: "https://www.kpn.com", category: "internet" },
            { name: "Thuisbezorgd", url: "https://www.thuisbezorgd.nl", category: "food" },
            { name: "Uber Eats NL", url: "https://www.ubereats.com/nl", category: "food" },
            { name: "NS Railways", url: "https://www.ns.nl", category: "transport" }
        ]
    },
    
    // BELGIUM
    {
        name: "Belgium", flag: "🇧🇪", region: "Europe",
        services: [
            { name: "Belgium.be", url: "https://www.belgium.be", category: "government" },
            { name: "KBC Bank", url: "https://www.kbc.be", category: "banking" },
            { name: "Engie Energy", url: "https://www.engie.be", category: "utilities" },
            { name: "Proximus", url: "https://www.proximus.be", category: "internet" },
            { name: "Deliveroo Belgium", url: "https://deliveroo.be", category: "food" },
            { name: "Uber Eats Belgium", url: "https://www.ubereats.com/be", category: "food" }
        ]
    },
    
    // SWITZERLAND
    {
        name: "Switzerland", flag: "🇨🇭", region: "Europe",
        services: [
            { name: "CH.ch Portal", url: "https://www.ch.ch", category: "government" },
            { name: "UBS Bank", url: "https://www.ubs.com/ch", category: "banking" },
            { name: "Credit Suisse", url: "https://www.credit-suisse.com/ch", category: "banking" },
            { name: "Swisscom", url: "https://www.swisscom.ch", category: "internet" },
            { name: "Uber Eats Switzerland", url: "https://www.ubereats.com/ch", category: "food" },
            { name: "SBB Railways", url: "https://www.sbb.ch", category: "transport" }
        ]
    },
    
    // AUSTRIA
    {
        name: "Austria", flag: "🇦🇹", region: "Europe",
        services: [
            { name: "Oesterreich.gv.at", url: "https://www.oesterreich.gv.at", category: "government" },
            { name: "Erste Bank", url: "https://www.erstebank.at", category: "banking" },
            { name: "Wien Energie", url: "https://www.wienenergie.at", category: "utilities" },
            { name: "A1 Telekom", url: "https://www.a1.net", category: "internet" },
            { name: "Lieferando Austria", url: "https://www.lieferando.at", category: "food" },
            { name: "ÖBB Railways", url: "https://www.oebb.at", category: "transport" }
        ]
    },
    
    // SWEDEN
    {
        name: "Sweden", flag: "🇸🇪", region: "Europe",
        services: [
            { name: "Sweden.se", url: "https://www.sweden.se", category: "government" },
            { name: "Swedbank", url: "https://www.swedbank.se", category: "banking" },
            { name: "Vattenfall Energy", url: "https://www.vattenfall.se", category: "utilities" },
            { name: "Telia Sweden", url: "https://www.telia.se", category: "internet" },
            { name: "Foodora Sweden", url: "https://www.foodora.se", category: "food" },
            { name: "SJ Railways", url: "https://www.sj.se", category: "transport" }
        ]
    },
    
    // NORWAY
    {
        name: "Norway", flag: "🇳🇴", region: "Europe",
        services: [
            { name: "Norway.no", url: "https://www.norway.no", category: "government" },
            { name: "DNB Bank", url: "https://www.dnb.no", category: "banking" },
            { name: "Statkraft Energy", url: "https://www.statkraft.no", category: "utilities" },
            { name: "Telenor Norway", url: "https://www.telenor.no", category: "internet" },
            { name: "Foodora Norway", url: "https://www.foodora.no", category: "food" },
            { name: "Vy Trains", url: "https://www.vy.no", category: "transport" }
        ]
    },
    
    // DENMARK
    {
        name: "Denmark", flag: "🇩🇰", region: "Europe",
        services: [
            { name: "Denmark.dk", url: "https://www.denmark.dk", category: "government" },
            { name: "Danske Bank", url: "https://www.danskebank.dk", category: "banking" },
            { name: "Ørsted Energy", url: "https://www.orsted.dk", category: "utilities" },
            { name: "TDC NET", url: "https://www.tdc.dk", category: "internet" },
            { name: "Just Eat Denmark", url: "https://www.just-eat.dk", category: "food" },
            { name: "DSB Railways", url: "https://www.dsb.dk", category: "transport" }
        ]
    },
    
    // FINLAND
    {
        name: "Finland", flag: "🇫🇮", region: "Europe",
        services: [
            { name: "Suomi.fi", url: "https://www.suomi.fi", category: "government" },
            { name: "Nordea Finland", url: "https://www.nordea.fi", category: "banking" },
            { name: "Fortum Energy", url: "https://www.fortum.fi", category: "utilities" },
            { name: "Elisa Finland", url: "https://www.elisa.fi", category: "internet" },
            { name: "Wolt Finland", url: "https://www.wolt.com/fi", category: "food" },
            { name: "VR Trains", url: "https://www.vr.fi", category: "transport" }
        ]
    },
    
    // POLAND
    {
        name: "Poland", flag: "🇵🇱", region: "Europe",
        services: [
            { name: "Gov.pl", url: "https://www.gov.pl", category: "government" },
            { name: "PKO Bank", url: "https://www.pkobp.pl", category: "banking" },
            { name: "PGE Energy", url: "https://www.pge.pl", category: "utilities" },
            { name: "Orange Poland", url: "https://www.orange.pl", category: "internet" },
            { name: "Glovo Poland", url: "https://www.glovoapp.com/pl", category: "food" },
            { name: "Uber Eats Poland", url: "https://www.ubereats.com/pl", category: "food" }
        ]
    },
    
    // PORTUGAL
    {
        name: "Portugal", flag: "🇵🇹", region: "Europe",
        services: [
            { name: "ePortugal", url: "https://www.eportugal.gov.pt", category: "government" },
            { name: "Millennium BCP", url: "https://www.millenniumbcp.pt", category: "banking" },
            { name: "EDP Energy", url: "https://www.edp.pt", category: "utilities" },
            { name: "MEO Telecom", url: "https://www.meo.pt", category: "internet" },
            { name: "Glovo Portugal", url: "https://www.glovoapp.com/pt", category: "food" },
            { name: "Uber Eats Portugal", url: "https://www.ubereats.com/pt", category: "food" }
        ]
    },
    
    // GREECE
    {
        name: "Greece", flag: "🇬🇷", region: "Europe",
        services: [
            { name: "Gov.gr", url: "https://www.gov.gr", category: "government" },
            { name: "National Bank of Greece", url: "https://www.nbg.gr", category: "banking" },
            { name: "PPC Energy", url: "https://www.dei.gr", category: "utilities" },
            { name: "Cosmote", url: "https://www.cosmote.gr", category: "internet" },
            { name: "efood", url: "https://www.e-food.gr", category: "food" }
        ]
    },
    
    // CZECH REPUBLIC
    {
        name: "Czech Republic", flag: "🇨🇿", region: "Europe",
        services: [
            { name: "Portal.gov.cz", url: "https://portal.gov.cz", category: "government" },
            { name: "Česká spořitelna", url: "https://www.csas.cz", category: "banking" },
            { name: "ČEZ Energy", url: "https://www.cez.cz", category: "utilities" },
            { name: "O2 Czech", url: "https://www.o2.cz", category: "internet" },
            { name: "Wolt Czech", url: "https://www.wolt.com/cz", category: "food" }
        ]
    },
    
    // ROMANIA
    {
        name: "Romania", flag: "🇷🇴", region: "Europe",
        services: [
            { name: "E-guvernare", url: "https://www.e-guvernare.ro", category: "government" },
            { name: "BCR Bank", url: "https://www.bcr.ro", category: "banking" },
            { name: "Enel Romania", url: "https://www.enel.ro", category: "utilities" },
            { name: "Orange Romania", url: "https://www.orange.ro", category: "internet" },
            { name: "Glovo Romania", url: "https://www.glovoapp.com/ro", category: "food" }
        ]
    },
    
    // HUNGARY
    {
        name: "Hungary", flag: "🇭🇺", region: "Europe",
        services: [
            { name: "Magyarország.hu", url: "https://www.magyarorszag.hu", category: "government" },
            { name: "OTP Bank", url: "https://www.otpbank.hu", category: "banking" },
            { name: "MVM Energy", url: "https://www.mvm.hu", category: "utilities" },
            { name: "Magyar Telekom", url: "https://www.telekom.hu", category: "internet" },
            { name: "Wolt Hungary", url: "https://www.wolt.com/hu", category: "food" }
        ]
    },
    
    // IRELAND
    {
        name: "Ireland", flag: "🇮🇪", region: "Europe",
        services: [
            { name: "Gov.ie", url: "https://www.gov.ie", category: "government" },
            { name: "Bank of Ireland", url: "https://www.bankofireland.com", category: "banking" },
            { name: "ESB Energy", url: "https://www.esb.ie", category: "utilities" },
            { name: "Eir Telecom", url: "https://www.eir.ie", category: "internet" },
            { name: "Deliveroo Ireland", url: "https://deliveroo.ie", category: "food" },
            { name: "Just Eat Ireland", url: "https://www.just-eat.ie", category: "food" }
        ]
    },
    
    // ESTONIA
    {
        name: "Estonia", flag: "🇪🇪", region: "Europe",
        services: [
            { name: "e-Estonia", url: "https://www.eesti.ee", category: "government" },
            { name: "e-Residency", url: "https://www.e-resident.gov.ee", category: "government" },
            { name: "SEB Estonia", url: "https://www.seb.ee", category: "banking" },
            { name: "Eesti Energia", url: "https://www.energia.ee", category: "utilities" },
            { name: "Telia Estonia", url: "https://www.telia.ee", category: "internet" },
            { name: "Wolt Estonia", url: "https://www.wolt.com/ee", category: "food" }
        ]
    },
    
    // LATVIA
    {
        name: "Latvia", flag: "🇱🇻", region: "Europe",
        services: [
            { name: "Latvia.lv", url: "https://www.latvia.lv", category: "government" },
            { name: "Swedbank Latvia", url: "https://www.swedbank.lv", category: "banking" },
            { name: "Latvenergo", url: "https://www.latvenergo.lv", category: "utilities" },
            { name: "LMT Telecom", url: "https://www.lmt.lv", category: "internet" },
            { name: "Wolt Latvia", url: "https://www.wolt.com/lv", category: "food" }
        ]
    },
    
    // LITHUANIA
    {
        name: "Lithuania", flag: "🇱🇹", region: "Europe",
        services: [
            { name: "Lietuva.lt", url: "https://www.lietuva.lt", category: "government" },
            { name: "SEB Lithuania", url: "https://www.seb.lt", category: "banking" },
            { name: "Ignitis Energy", url: "https://www.ignitis.lt", category: "utilities" },
            { name: "Telia Lithuania", url: "https://www.telia.lt", category: "internet" },
            { name: "Wolt Lithuania", url: "https://www.wolt.com/lt", category: "food" }
        ]
    },
    
    // AFRICAN COUNTRIES
    
    // SOUTH AFRICA
    {
        name: "South Africa", flag: "🇿🇦", region: "Southern Africa",
        services: [
            { name: "Gov.za", url: "https://www.gov.za", category: "government" },
            { name: "SARS eFiling", url: "https://www.sars.gov.za", category: "government" },
            { name: "Standard Bank", url: "https://www.standardbank.co.za", category: "banking" },
            { name: "FNB Bank", url: "https://www.fnb.co.za", category: "banking" },
            { name: "Eskom Energy", url: "https://www.eskom.co.za", category: "utilities" },
            { name: "MTN South Africa", url: "https://www.mtn.co.za", category: "internet" },
            { name: "Uber Eats SA", url: "https://www.ubereats.com/za", category: "food" },
            { name: "Mr D Food", url: "https://www.mrdfood.com", category: "food" },
            { name: "Bolt South Africa", url: "https://bolt.eu", category: "transport" }
        ]
    },
    
    // KENYA
    {
        name: "Kenya", flag: "🇰🇪", region: "East Africa",
        services: [
            { name: "eCitizen Portal", url: "https://www.ecitizen.go.ke", category: "government" },
            { name: "KRA iTax", url: "https://itax.kra.go.ke", category: "government" },
            { name: "Equity Bank", url: "https://www.equitybank.co.ke", category: "banking" },
            { name: "KCB Bank", url: "https://www.kcbgroup.com", category: "banking" },
            { name: "Kenya Power", url: "https://www.kplc.co.ke", category: "utilities" },
            { name: "Safaricom", url: "https://www.safaricom.co.ke", category: "internet" },
            { name: "Glovo Kenya", url: "https://www.glovoapp.com/ke", category: "food" },
            { name: "Uber Eats Kenya", url: "https://www.ubereats.com/ke", category: "food" },
            { name: "Bolt Kenya", url: "https://bolt.eu", category: "transport" }
        ]
    },
    
    // NIGERIA
    {
        name: "Nigeria", flag: "🇳🇬", region: "West Africa",
        services: [
            { name: "Nigeria.gov.ng", url: "https://www.nigeria.gov.ng", category: "government" },
            { name: "FIRS Tax", url: "https://www.firs.gov.ng", category: "government" },
            { name: "GTBank", url: "https://www.gtbank.com", category: "banking" },
            { name: "Access Bank", url: "https://www.accessbankplc.com", category: "banking" },
            { name: "NERC Electricity", url: "https://www.nerc.gov.ng", category: "utilities" },
            { name: "MTN Nigeria", url: "https://www.mtnonline.com", category: "internet" },
            { name: "Jumia Food Nigeria", url: "https://food.jumia.com.ng", category: "food" },
            { name: "Glovo Nigeria", url: "https://www.glovoapp.com/ng", category: "food" },
            { name: "Bolt Nigeria", url: "https://bolt.eu", category: "transport" }
        ]
    },
    
    // GHANA
    {
        name: "Ghana", flag: "🇬🇭", region: "West Africa",
        services: [
            { name: "Ghana.gov.gh", url: "https://www.ghana.gov.gh", category: "government" },
            { name: "GRA Tax", url: "https://www.gra.gov.gh", category: "government" },
            { name: "Ecobank Ghana", url: "https://www.ecobank.com/gh", category: "banking" },
            { name: "ECG Electricity", url: "https://www.ecgonline.info", category: "utilities" },
            { name: "MTN Ghana", url: "https://www.mtn.com.gh", category: "internet" },
            { name: "Glovo Ghana", url: "https://www.glovoapp.com/gh", category: "food" },
            { name: "Bolt Ghana", url: "https://bolt.eu", category: "transport" }
        ]
    },
    
    // RWANDA
    {
        name: "Rwanda", flag: "🇷🇼", region: "East Africa",
        services: [
            { name: "Irembo Portal", url: "https://www.irembo.gov.rw", category: "government" },
            { name: "RRA Tax", url: "https://www.rra.gov.rw", category: "government" },
            { name: "Bank of Kigali", url: "https://www.bk.rw", category: "banking" },
            { name: "REG Energy", url: "https://www.reg.rw", category: "utilities" },
            { name: "MTN Rwanda", url: "https://www.mtn.co.rw", category: "internet" },
            { name: "Glovo Rwanda", url: "https://www.glovoapp.com/rw", category: "food" }
        ]
    },
    
    // ETHIOPIA
    {
        name: "Ethiopia", flag: "🇪🇹", region: "East Africa",
        services: [
            { name: "Ethiopia Government", url: "https://www.ethiopia.gov.et", category: "government" },
            { name: "Commercial Bank of Ethiopia", url: "https://www.combanketh.et", category: "banking" },
            { name: "Ethiopian Electric", url: "https://www.eep.com.et", category: "utilities" },
            { name: "Ethio Telecom", url: "https://www.ethiotelecom.et", category: "internet" }
        ]
    },
    
    // TANZANIA
    {
        name: "Tanzania", flag: "🇹🇿", region: "East Africa",
        services: [
            { name: "Tanzania Government", url: "https://www.tanzania.go.tz", category: "government" },
            { name: "CRDB Bank", url: "https://www.crdbbank.co.tz", category: "banking" },
            { name: "TANESCO", url: "https://www.tanesco.co.tz", category: "utilities" },
            { name: "Vodacom Tanzania", url: "https://www.vodacom.co.tz", category: "internet" },
            { name: "Glovo Tanzania", url: "https://www.glovoapp.com/tz", category: "food" }
        ]
    },
    
    // UGANDA
    {
        name: "Uganda", flag: "🇺🇬", region: "East Africa",
        services: [
            { name: "Uganda Government", url: "https://www.gou.go.ug", category: "government" },
            { name: "Stanbic Bank Uganda", url: "https://www.stanbicbank.co.ug", category: "banking" },
            { name: "UMEME Electricity", url: "https://www.umeme.co.ug", category: "utilities" },
            { name: "MTN Uganda", url: "https://www.mtn.co.ug", category: "internet" },
            { name: "Glovo Uganda", url: "https://www.glovoapp.com/ug", category: "food" }
        ]
    },
    
    // SENEGAL
    {
        name: "Senegal", flag: "🇸🇳", region: "West Africa",
        services: [
            { name: "Senegal Government", url: "https://www.sec.gouv.sn", category: "government" },
            { name: "SGBS Bank", url: "https://www.sgbs.sn", category: "banking" },
            { name: "Senelec", url: "https://www.senelec.sn", category: "utilities" },
            { name: "Orange Senegal", url: "https://www.orange.sn", category: "internet" }
        ]
    },
    
    // IVORY COAST
    {
        name: "Ivory Coast", flag: "🇨🇮", region: "West Africa",
        services: [
            { name: "Côte d'Ivoire Government", url: "https://www.gouv.ci", category: "government" },
            { name: "SGBCI Bank", url: "https://www.sgbci.ci", category: "banking" },
            { name: "CIE Electricity", url: "https://www.cie.ci", category: "utilities" },
            { name: "Orange CI", url: "https://www.orange.ci", category: "internet" },
            { name: "Glovo Ivory Coast", url: "https://www.glovoapp.com/ci", category: "food" }
        ]
    },
    
    // CAMEROON
    {
        name: "Cameroon", flag: "🇨🇲", region: "Central Africa",
        services: [
            { name: "Cameroon Government", url: "https://www.spm.gov.cm", category: "government" },
            { name: "Afriland First Bank", url: "https://www.afrilandfirstbank.com", category: "banking" },
            { name: "ENEO Electricity", url: "https://www.eneocameroun.cm", category: "utilities" },
            { name: "MTN Cameroon", url: "https://www.mtn.cm", category: "internet" }
        ]
    },
    
    // ZIMBABWE
    {
        name: "Zimbabwe", flag: "🇿🇼", region: "Southern Africa",
        services: [
            { name: "Zimbabwe Government", url: "https://www.zim.gov.zw", category: "government" },
            { name: "CBZ Bank", url: "https://www.cbz.co.zw", category: "banking" },
            { name: "ZESA Electricity", url: "https://www.zesa.co.zw", category: "utilities" },
            { name: "Econet Zimbabwe", url: "https://www.econet.co.zw", category: "internet" }
        ]
    },
    
    // ZAMBIA
    {
        name: "Zambia", flag: "🇿🇲", region: "Southern Africa",
        services: [
            { name: "Zambia Government", url: "https://www.zambia.gov.zm", category: "government" },
            { name: "Zanaco Bank", url: "https://www.zanaco.co.zm", category: "banking" },
            { name: "ZESCO Electricity", url: "https://www.zesco.co.zm", category: "utilities" },
            { name: "MTN Zambia", url: "https://www.mtn.co.zm", category: "internet" }
        ]
    },
    
    // BOTSWANA
    {
        name: "Botswana", flag: "🇧🇼", region: "Southern Africa",
        services: [
            { name: "Botswana Government", url: "https://www.gov.bw", category: "government" },
            { name: "First National Bank", url: "https://www.fnbbotswana.co.bw", category: "banking" },
            { name: "BPC Electricity", url: "https://www.bpc.bw", category: "utilities" },
            { name: "Mascom", url: "https://www.mascom.bw", category: "internet" }
        ]
    },
    
    // NAMIBIA
    {
        name: "Namibia", flag: "🇳🇦", region: "Southern Africa",
        services: [
            { name: "Namibia Government", url: "https://www.gov.na", category: "government" },
            { name: "Bank Windhoek", url: "https://www.bankwindhoek.com.na", category: "banking" },
            { name: "NamPower", url: "https://www.nampower.com.na", category: "utilities" },
            { name: "MTC Namibia", url: "https://www.mtc.com.na", category: "internet" }
        ]
    },
    
    // MOZAMBIQUE
    {
        name: "Mozambique", flag: "🇲🇿", region: "Southern Africa",
        services: [
            { name: "Mozambique Government", url: "https://www.portaldogoverno.gov.mz", category: "government" },
            { name: "Millennium BIM", url: "https://www.millenniumbim.co.mz", category: "banking" },
            { name: "EDM Electricity", url: "https://www.edm.co.mz", category: "utilities" },
            { name: "Vodacom Mozambique", url: "https://www.vm.co.mz", category: "internet" }
        ]
    },
    
    // ANGOLA
    {
        name: "Angola", flag: "🇦🇴", region: "Central Africa",
        services: [
            { name: "Angola Government", url: "https://www.governo.gov.ao", category: "government" },
            { name: "BAI Bank", url: "https://www.bancobai.ao", category: "banking" },
            { name: "ENDE Electricity", url: "https://www.ende.co.ao", category: "utilities" },
            { name: "Unitel Angola", url: "https://www.unitel.ao", category: "internet" }
        ]
    },
    
    // MADAGASCAR
    {
        name: "Madagascar", flag: "🇲🇬", region: "East Africa",
        services: [
            { name: "Madagascar Government", url: "https://www.presidence.gov.mg", category: "government" },
            { name: "BNI Madagascar", url: "https://www.bni.mg", category: "banking" },
            { name: "JIRAMA Utilities", url: "https://www.jirama.mg", category: "utilities" },
            { name: "Telma", url: "https://www.telma.mg", category: "internet" }
        ]
    },
    
    // MALI
    {
        name: "Mali", flag: "🇲🇱", region: "West Africa",
        services: [
            { name: "Mali Government", url: "https://www.gouv.ml", category: "government" },
            { name: "BDM Bank", url: "https://www.bdm-sa.com", category: "banking" },
            { name: "EDM Electricity", url: "https://www.edm-sa.com.ml", category: "utilities" },
            { name: "Orange Mali", url: "https://www.orange.ml", category: "internet" }
        ]
    },
    
    // BURKINA FASO
    {
        name: "Burkina Faso", flag: "🇧🇫", region: "West Africa",
        services: [
            { name: "Burkina Faso Government", url: "https://www.gouvernement.gov.bf", category: "government" },
            { name: "Coris Bank", url: "https://www.corisbank.bf", category: "banking" },
            { name: "SONABEL Electricity", url: "https://www.sonabel.bf", category: "utilities" },
            { name: "Orange Burkina", url: "https://www.orange.bf", category: "internet" }
        ]
    },
    
    // ASIA & OCEANIA
    
    // SINGAPORE
    {
        name: "Singapore", flag: "🇸🇬", region: "Southeast Asia",
        services: [
            { name: "Singpass", url: "https://www.singpass.gov.sg", category: "government" },
            { name: "Gov.sg", url: "https://www.gov.sg", category: "government" },
            { name: "DBS Bank", url: "https://www.dbs.com.sg", category: "banking" },
            { name: "OCBC Bank", url: "https://www.ocbc.com", category: "banking" },
            { name: "SP Group", url: "https://www.spgroup.com.sg", category: "utilities" },
            { name: "Singtel", url: "https://www.singtel.com", category: "internet" },
            { name: "GrabFood", url: "https://www.grab.com/sg", category: "food" },
            { name: "Deliveroo Singapore", url: "https://deliveroo.sg", category: "food" },
            { name: "Grab Transport", url: "https://www.grab.com/sg", category: "transport" }
        ]
    },
    
    // MALAYSIA
    {
        name: "Malaysia", flag: "🇲🇾", region: "Southeast Asia",
        services: [
            { name: "MyGovernment", url: "https://www.malaysia.gov.my", category: "government" },
            { name: "Maybank", url: "https://www.maybank.com", category: "banking" },
            { name: "CIMB Bank", url: "https://www.cimb.com.my", category: "banking" },
            { name: "TNB Energy", url: "https://www.tnb.com.my", category: "utilities" },
            { name: "Maxis", url: "https://www.maxis.com.my", category: "internet" },
            { name: "GrabFood Malaysia", url: "https://www.grab.com/my", category: "food" },
            { name: "Foodpanda Malaysia", url: "https://www.foodpanda.my", category: "food" },
            { name: "Grab Malaysia", url: "https://www.grab.com/my", category: "transport" }
        ]
    },
    
    // INDONESIA
    {
        name: "Indonesia", flag: "🇮🇩", region: "Southeast Asia",
        services: [
            { name: "Indonesia.go.id", url: "https://www.indonesia.go.id", category: "government" },
            { name: "Bank Mandiri", url: "https://www.bankmandiri.co.id", category: "banking" },
            { name: "BCA Bank", url: "https://www.bca.co.id", category: "banking" },
            { name: "PLN Electricity", url: "https://www.pln.co.id", category: "utilities" },
            { name: "Telkomsel", url: "https://www.telkomsel.com", category: "internet" },
            { name: "GoFood", url: "https://www.gofood.co.id", category: "food" },
            { name: "GrabFood Indonesia", url: "https://www.grab.com/id", category: "food" },
            { name: "Gojek", url: "https://www.gojek.com", category: "transport" }
        ]
    },
    
    // THAILAND
    {
        name: "Thailand", flag: "🇹🇭", region: "Southeast Asia",
        services: [
            { name: "Thailand.go.th", url: "https://www.thailand.go.th", category: "government" },
            { name: "Bangkok Bank", url: "https://www.bangkokbank.com", category: "banking" },
            { name: "Kasikorn Bank", url: "https://www.kasikornbank.com", category: "banking" },
            { name: "MEA Electricity", url: "https://www.mea.or.th", category: "utilities" },
            { name: "AIS Thailand", url: "https://www.ais.th", category: "internet" },
            { name: "GrabFood Thailand", url: "https://www.grab.com/th", category: "food" },
            { name: "Foodpanda Thailand", url: "https://www.foodpanda.co.th", category: "food" },
            { name: "Grab Thailand", url: "https://www.grab.com/th", category: "transport" }
        ]
    },
    
    // PHILIPPINES
    {
        name: "Philippines", flag: "🇵🇭", region: "Southeast Asia",
        services: [
            { name: "Gov.ph", url: "https://www.gov.ph", category: "government" },
            { name: "BDO Bank", url: "https://www.bdo.com.ph", category: "banking" },
            { name: "BPI Bank", url: "https://www.bpi.com.ph", category: "banking" },
            { name: "Meralco", url: "https://www.meralco.com.ph", category: "utilities" },
            { name: "Globe Telecom", url: "https://www.globe.com.ph", category: "internet" },
            { name: "GrabFood Philippines", url: "https://www.grab.com/ph", category: "food" },
            { name: "Foodpanda Philippines", url: "https://www.foodpanda.ph", category: "food" },
            { name: "Grab Philippines", url: "https://www.grab.com/ph", category: "transport" }
        ]
    },
    
    // VIETNAM
    {
        name: "Vietnam", flag: "🇻🇳", region: "Southeast Asia",
        services: [
            { name: "Vietnam Government", url: "https://www.chinhphu.vn", category: "government" },
            { name: "Vietcombank", url: "https://www.vietcombank.com.vn", category: "banking" },
            { name: "BIDV Bank", url: "https://www.bidv.com.vn", category: "banking" },
            { name: "EVN Electricity", url: "https://www.evn.com.vn", category: "utilities" },
            { name: "Viettel", url: "https://www.viettel.com.vn", category: "internet" },
            { name: "GrabFood Vietnam", url: "https://www.grab.com/vn", category: "food" },
            { name: "ShopeeFood", url: "https://www.shopeefood.vn", category: "food" },
            { name: "Grab Vietnam", url: "https://www.grab.com/vn", category: "transport" }
        ]
    },
    
    // INDIA
    {
        name: "India", flag: "🇮🇳", region: "South Asia",
        services: [
            { name: "India.gov.in", url: "https://www.india.gov.in", category: "government" },
            { name: "DigiLocker", url: "https://www.digilocker.gov.in", category: "government" },
            { name: "State Bank of India", url: "https://www.sbi.co.in", category: "banking" },
            { name: "HDFC Bank", url: "https://www.hdfcbank.com", category: "banking" },
            { name: "ICICI Bank", url: "https://www.icicibank.com", category: "banking" },
            { name: "BSES Electricity", url: "https://www.bsesdelhi.com", category: "utilities" },
            { name: "Airtel India", url: "https://www.airtel.in", category: "internet" },
            { name: "Jio", url: "https://www.jio.com", category: "internet" },
            { name: "Swiggy", url: "https://www.swiggy.com", category: "food" },
            { name: "Zomato", url: "https://www.zomato.com", category: "food" },
            { name: "Uber India", url: "https://www.uber.com/in", category: "transport" },
            { name: "Ola Cabs", url: "https://www.olacabs.com", category: "transport" }
        ]
    },
    
    // PAKISTAN
    {
        name: "Pakistan", flag: "🇵🇰", region: "South Asia",
        services: [
            { name: "Pakistan.gov.pk", url: "https://www.pakistan.gov.pk", category: "government" },
            { name: "HBL Bank", url: "https://www.hbl.com", category: "banking" },
            { name: "UBL Bank", url: "https://www.ubl.com", category: "banking" },
            { name: "K-Electric", url: "https://www.ke.com.pk", category: "utilities" },
            { name: "Jazz Pakistan", url: "https://www.jazz.com.pk", category: "internet" },
            { name: "Foodpanda Pakistan", url: "https://www.foodpanda.pk", category: "food" },
            { name: "Careem Pakistan", url: "https://www.careem.com", category: "transport" }
        ]
    },
    
    // BANGLADESH
    {
        name: "Bangladesh", flag: "🇧🇩", region: "South Asia",
        services: [
            { name: "Bangladesh.gov.bd", url: "https://www.bangladesh.gov.bd", category: "government" },
            { name: "Dutch-Bangla Bank", url: "https://www.dutchbanglabank.com", category: "banking" },
            { name: "BRAC Bank", url: "https://www.bracbank.com", category: "banking" },
            { name: "DESCO Electricity", url: "https://www.desco.gov.bd", category: "utilities" },
            { name: "Grameenphone", url: "https://www.grameenphone.com", category: "internet" },
            { name: "Foodpanda Bangladesh", url: "https://www.foodpanda.com.bd", category: "food" },
            { name: "Pathao", url: "https://www.pathao.com", category: "transport" }
        ]
    },
