<template>
  <div class="connection">
    <div class="connection__box">
      <div class="box__back"></div>
      <div class="box__content">
        <div class="connection__box__title">
          <div class="back" @click="back"><i class="el-icon-arrow-left"></i></div>
          <div class="user">{{ this.user_Info }}</div>
        </div>
        <div class="connection__box__content" id="father">
          <section class="message-right">
          <ul class="chatListRight" v-for="(item,index) in message" :key="index">
            <li>
              <div class="img">
                <img :src="item.picture">
              </div>
              <div class="msg">{{item.message}}
                <div class="biao"></div>
              </div>
            </li>
          </ul>
          </section>
        </div>
        <div class="connection__box__Input">
          <input type="text" class="input" v-model="setmessage" @keyup.enter="toSend"
           />
          <el-button type="primary" class="btn" @click="toSend">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "connection",
  data() {
    return {
      message: [],
      setmessage: "",
      username: "",
      user_Info: this.$route.params.username,
      my_userInfo: {},
    };
  },
  mounted() {
    console.log(this.user_Info);
    this.$socket.connect();
    const user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.username = user.username;
    this.$socket.emit("setName", this.username);
  },
  created() {},
  methods: {
    toSend() {
      const user = JSON.parse(sessionStorage.getItem("userInfo"));
      this.my_userInfo = user;
      this.message.push({
        username:this.my_userInfo.username,
        picture:this.my_userInfo.picture,
        message:this.setmessage
      })
      this.$socket.emit("test", {
        toName: this.user_Info,
        setName: user,
        message: this.setmessage,
      });
      this.setmessage = ''
    },
    back(){
      window.history.back()
    }
  },
  sockets: {
    connect() {
      console.log("连接成功！");
    },
  },
};
</script>

<style lang="scss" scoped>
.connection {
  position: relative;
  &__box {
    width: 1200px;
    min-height: 1400px;
    background-size: 100% 100%;
    border: 3px solid #fff;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    .box__back {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("../../../public/12.jpg");
      z-index: -99;
      opacity: 0.6;
      box-sizing: border-box;
    }
    .box__content {
      padding: 50px 50px;
    }
    &__title {
      overflow: hidden;
      .back {
        float: left;
      }
      .user {
        float: left;
        margin-left: 400px;
      }
    }
    &__content {
      height: 1200px;
      margin: 20px 0;
      z-index: 2;
      overflow: auto;
      .message-right{
        float: right;
        .chatListRight{
           margin-top: 20px;
          li{
            overflow: hidden;
            list-style: none;
            .img{
               float: right;
               width: 60px;
               height: 60px;
             img{
              width: 100%;
              height: 100%;
            }
           }
           .msg{
             position: relative;
             max-width: 400px;
             word-break: break-all;
             padding: 10px 10px;
             text-align: center;
             border-radius: 10px;
             line-height: 20px;
             background: #3a8ee6;
             float: right;
             margin-right: 20px;
             .biao{
               position: absolute;
               right: -10px;
               top: 15px;
               transform: rotateX(135deg);
               width: 0;
               height: 0;
               border: 10px solid transparent;
               border-top-color: #3a8ee6;
             }
           }
          }
        }
      }
    }
    &__Input {
      border: 3px solid #fff;
      border-radius: 10px;
      .input {
        margin-left: 20px;
        width: 900px;
        height: 50px;
        outline: none;
        border: none;
        font-size: 30px;
        background-color: transparent;
      }
      .btn {
        float: right;
        width: 100px;
        height: 50px;
        border-radius: 10px;
      }
    }
  }
}
</style>
