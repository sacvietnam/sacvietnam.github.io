class Formatter {
  static toVND(amount: number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  static numberToPronunciation(number: number) {
    const units = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];
    const tens = [
      "",
      "",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
    ];
    const hundreds = [
      "",
      "một trăm",
      "hai trăm",
      "ba trăm",
      "bốn trăm",
      "năm trăm",
      "sáu trăm",
      "bảy trăm",
      "tám trăm",
      "chín trăm",
    ];
    const levels = ["", "nghìn", "triệu", "tỷ"];

    let result = "";
    let level = 0;

    while (number > 0) {
      const thousand = number % 1000;
      number = Math.floor(number / 1000);
      if (thousand > 0) {
        const hundred = Math.floor(thousand / 100);
        const ten = Math.floor((thousand % 100) / 10);
        const unit = thousand % 10;
        let part = "";
        if (hundred > 0) {
          part += hundreds[hundred] + " ";
        }
        if (ten > 0) {
          part += (ten === 1 ? "mười" : tens[ten]) + " ";
        }
        if (unit > 0) {
          part += ten === 1 && unit === 5 ? "lăm" : units[unit];
        }
        result = part + " " + levels[level] + " " + result;
      }
      level++;
    }

    return result.trim();
  }

  static toDate(date: string | Date) {
    return new Date(date).toLocaleDateString("vi-VN");
  }

  static toDateTime(date: string | Date) {
    return `${new Date(date).toLocaleTimeString("vi-VN")} ${new Date(
      date,
    ).toLocaleDateString("vi-VN")}`;
  }
}

export default Formatter;
