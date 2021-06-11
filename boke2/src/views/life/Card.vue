<template>
  <div ref="box" class="waterFall-box">
    <div
      v-for="(item, index) in images"
      :key="item._id"
      ref="img"
      class="img-box"
      @mouseover="handledesc(index)"
      @mouseout="handledesc2(index)"
    >
      <el-card class="card">
        <img :src="item.img" />
        <div ref="desc" class="img__desc">{{ item.desc }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaterFall",
  props: ["imges"],
  data() {
    return {
      images: [
        {
          _id: 0,
          img: require("../../../public/1.jpg"),
          desc: "和实际发生事故附件是刚开始是富士康粉红色科夫斯克列夫考虑",
        },
        {
          _id: 1,
          img: require("../../../public/2.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 2,
          img: require("../../../public/3.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 3,
          img: require("../../../public/4.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 4,
          img: require("../../../public/5.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 5,
          img: require("../../../public/6.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 6,
          img: require("../../../public/7.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 7,
          img: require("../../../public/8.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 8,
          img: require("../../../public/1.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 9,
          img: require("../../../public/2.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 10,
          img: require("../../../public/8.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 11,
          img: require("../../../public/4.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 12,
          img: require("../../../public/4.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 13,
          img: require("../../../public/3.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 14,
          img: require("../../../public/3.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 15,
          img: require("../../../public/1.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
        {
          _id: 16,
          img: require("../../../public/1.jpg"),
          desc: "和实际发生事故附件是刚开始是",
        },
      ], //存储图片资源
      imgWidth: 350, //图片的宽度
      heightArray: [], //存储高度数组，用于判断最小高度的图片位置
      offsetP: 0,
      count: 0,
    };
  },
  created() {
    this.loadImgHeight();
  },
  methods: {
    ImgHight() {
      var imgBox = this.$refs.img;
      var imgClientWidth = this.$refs.box.offsetWidth;
      var col = parseInt(imgClientWidth / this.imgWidth);
      imgBox.forEach((item, index) => {
        var boxHeight = item.offsetHeight;
        if (index < col) {
          this.heightArray[index] = boxHeight;
        } else {
          //  求出数组中最小高度的索引值
          // 数组中的最小值
          if (this.heightArray.length <= col) {
            var min = Math.min(...this.heightArray);
            var minIndex = this.heightArray.indexOf(min);
            item.style.position = "absolute";
            item.style.top = min + "px";
            item.style.left = minIndex * this.imgWidth + "px";
            this.heightArray[minIndex] += boxHeight;
            //  console.log(this.heightArray)
          }
        }
      });
    },
    loadImgHeight() {
      let count = 0; //计数变量 判断是否预加载图片是否完成
      this.images.forEach((item) => {
        //使用image类预加载图片
        let image = new Image();
        image.src = item.img;
        image.onload = image.onerror = () => {
          count++;
          if (count == this.images.length) {
            this.$nextTick(() => {
              this.ImgHight();
            });
          }
        };
      });
    },
    handledesc(index) {
      this.$refs.desc[index].style.visibility = "visible";
    },
    handledesc2(index) {
      this.$refs.desc[index].style.visibility = "hidden";
    },
  },
};
</script>

<style scoped lang="scss">
.waterFall-box {
  position: relative;
  height: 2000px;
  .img-box {
    width: 350px;
    float: left;
    cursor: pointer;
    .card {
      position: relative;
      img {
        width: 100%;
      }
      .img__desc {
        width: 100%;
        height: 100%;
        background: #333;
        opacity: 0.7;
        color: #3a8ee6;
        visibility: hidden;
        text-align: center;
        line-height: 200px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
