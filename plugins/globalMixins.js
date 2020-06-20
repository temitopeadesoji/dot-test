import Vue from "vue";

Vue.mixin({
  methods: {
    //CAPITALIZE FIRST LETTER OF STRING
    jsUcfirst(string) {
      let stringArr = string.split(" ");
      if (stringArr.length > 0) {
        for (var i = 0; i < stringArr.length; i++) {
          stringArr[i].split("").filter((el, index) => {
            return el == el.toUpperCase() && index != 0;
          });
          if (stringArr.length > 0) {
            return stringArr.join(" ");
          } else {
            stringArr[i] =
              stringArr[i].charAt(0).toUpperCase() +
                stringArr[i].slice(1).toLowerCase() || stringArr[i];
            if (i == stringArr.length - 1) {
              return stringArr.join(" ");
            }
          }
        }
      } else {
        stringArr[i].split("").filter((el, index) => {
          return el == el.toUpperCase() && index != 0;
        });
        if (stringArr.length > 0) {
          return stringArr.join(" ");
        } else {
          return (
            string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() ||
            string
          );
        }
      }
    },
    //CHECK IF STRING IS EMPTY
    isEmpty(value) {
      return value == null || value.length === 0;
    },
    trimNumber(num) {
      if (num >= 1000000000) {
        return (
          num
            .toString()
            .slice(0, -9)
            .replace(/\.0$/, "") + "G"
        );
      }
      if (num >= 1000000) {
        return (
          num
            .toString()
            .slice(0, -6)
            .replace(/\.0$/, "") + "M"
        );
      }
      if (num >= 1000) {
        return (
          num
            .toString()
            .slice(0, -3)
            .replace(/\.0$/, "") + "K"
        );
      }
      return num;
    },
    //ADD COMMAS
    numberWithCommas(number) {
      var parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  }
});
