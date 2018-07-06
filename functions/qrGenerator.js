const crc = require('crc')

const ID_PAYLOAD_FORMAT = '00'
const ID_POI_METHOD = '01'
const ID_MERCHANT_INFORMATION_BOT = '43'
const ID_CUIT = '50'
const ID_ALIAS_CBU = '51'
const ID_MERCHANT_CODE = '52'
const ID_TRANSACTION_CURRENCY = '53'
const ID_COUNTRY_CODE = '58'
const ID_NAME = '59'
const ID_CITY = '60'
const ID_CRC = '63'


const PAYLOAD_FORMAT_EMV_QRCPS_MERCHANT_PRESENTED_MODE = '01'
const POI_METHOD_STATIC = '11'
const MERCHANT_INFORMATION_TEMPLATE_ID_GUID = '00'
const GUID_MERCHAN_BANK = 'numerodecliente'
const TRANSACTION_CURRENCY = '032'
const COUNTRY_CODE = 'AR'
const MERCHANT_CODE = '1111'

const f = (id, value) => ( [ id, ('00' + value.length).slice(-2), value ].join(''));
  
const serialize = (xs) => (xs.filter((x) => { return x }).join(''));
const formatCrc = (crcValue) => ('0000' + crcValue.toString(16).toUpperCase()).slice(-4);

const generatePayload = ({name,cuit,alias,city}) => {

  const data = [
    f(ID_PAYLOAD_FORMAT, PAYLOAD_FORMAT_EMV_QRCPS_MERCHANT_PRESENTED_MODE),
    f(ID_POI_METHOD, POI_METHOD_STATIC),
    f(ID_MERCHANT_INFORMATION_BOT, serialize([
      f(MERCHANT_INFORMATION_TEMPLATE_ID_GUID, GUID_MERCHAN_BANK),
    ])),
    f(ID_CUIT, serialize([
      f(MERCHANT_INFORMATION_TEMPLATE_ID_GUID, cuit),
    ])),
    f(ID_ALIAS_CBU, serialize([
      f(MERCHANT_INFORMATION_TEMPLATE_ID_GUID, alias),
    ])),
    f(ID_MERCHANT_CODE, MERCHANT_CODE),
    f(ID_TRANSACTION_CURRENCY, TRANSACTION_CURRENCY),
    f(ID_COUNTRY_CODE, COUNTRY_CODE),
    f(ID_NAME, name),
    f(ID_CITY, city),
  ]
  const dataToCrc = serialize(data) + ID_CRC + '04'
  data.push(f(ID_CRC, formatCrc(crc.crc16xmodem(dataToCrc, 0xffff))))
  return serialize(data)
}

module.exports = generatePayload;