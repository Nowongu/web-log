class Utils
{
    public getIp = (ipValue: string) : string => {
      let values = ipValue.split(',')
      if (values.length > 1) {
        return values[0]
      }
      else {
        values = ipValue.split(':')
        return values[values.length - 1]
      }
    }
}

const utils = new Utils

export default utils