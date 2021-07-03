<template>
  <div class="connection">
    <div class="connection__box">
      <div class="box__back"></div>
      <div class="box__content">
        <div class="connection__box__title">
          <div class="back"><i class="el-icon-arrow-left"></i></div>
          <div class="user">用户名</div>
        </div>
        <div class="connection__box__content">
          <!-- <section v-for="(setMsg, index) in message" :key="index">
          <ul class="chatListRight" v-if="setMsg.to==toName&&setMsg.to!==username">
            <li>
              <div class="message-right">{{ setMsg.msg }}</div>
              <img :src="">
            </li>
          </ul>
          <ul class="chatListLeft" v-if="setMsg.setName==toName&&setMsg.server">
            <li>
              <img :src="">
              <div class="message-left">{{ setMsg.msg }}</div>
            </li>
          </ul>
        </section> -->
        </div>
        <div class="connection__box__Input">
          <input type="text" class="input" v-model="setmessage" />
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
      message:[],
      setmessage: "",
      username: "",
      toName: this.$route.params.username,
    };
  },
  mounted() {
    this.$socket.connect()
    //  this.sockets.subscribe('test1',(data)=>{
    //           console.log(data)
    //         })
    const user = JSON.parse(sessionStorage.getItem("userInfo"))
    this.username = user.username
    this.$socket.emit('setName',this.username)

  },
  created(){
  },
  methods: {
    toSend() {
      console.log(this.toName)
       this.$socket.emit('test2',{toName:this.toName,userName:this.username,message:this.setmessage})
    }
  },
  sockets:{
    connect(){
      console.log("okk")
    },
    test(){
      console.log('test')
    }
  }

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
      // background: #f2f6fc;
      z-index: 2;
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
