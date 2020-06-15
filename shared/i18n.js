import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
var myanmarNumbers = require("myanmar-numbers");

i18n
	.use(Backend)
  .use(initReactI18next)
  .init({
    lng: "mm",
    fallbackLng: "en",
		backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json'
		},
		ns: ['common', 'moduleA', 'newCommunity'],
		defaultNS: 'common',	
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      format: function(value, format, lng) {
          if (format === 'number' && lng === "mm") return myanmarNumbers(value, "my");
          if(value instanceof Date) return moment(value).format(format);
          return value;
      }
    }



  },(err, t) => {
		console.log('err', err);
		console.log('t', t('Welcome to React'));
		console.log('t', t('moduleA:Welcome to React'));
	});

export default i18n;