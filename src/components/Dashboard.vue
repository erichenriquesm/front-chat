<template>
  <div>
    <div class="main">
      <div id="side-right" class="block">
        <div class="block-header mb-2">
          <img
            src="https://gitlab.com/uploads/-/system/user/avatar/13002995/avatar.png?width=96"
            class="img-icon"
          />
          <div class="options">
            <img src="@/assets/users.svg" alt="group" />
            <img src="@/assets/message-square.svg" alt="message" />
            <img src="@/assets/more-vertical.svg" alt="message" />
          </div>
        </div>
        <div class="search-block">
          <img src="@/assets/search.svg" alt="search" />
          <b-form-input
            placeholder="Pesquise ou começar nova conversa"
            id="search"
          ></b-form-input>
        </div>
        <div class="users-list">
          <div class="user-box" v-for="(user, index) in users" :key="index">
            <img
              src="https://gitlab.com/uploads/-/system/user/avatar/13002995/avatar.png?width=96"
              class="img-icon"
            />
            <div class="msg-info">
              <span class="name mt-4">{{ user.name }}</span>
              <div class="x">
                <div class="vist">
                  <img id="checked" src="@/assets/check.svg" alt="message" />
                  <span class="last-message">Oi</span>
                </div>
                <span>Ontem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block msg-panel">
        <div class="block-header mb-2 user-panel">
          <div class="flex-user">
            <img
              src="https://gitlab.com/uploads/-/system/user/avatar/13002995/avatar.png?width=96"
              class="img-icon"
            />
            <p>Eric</p>
          </div>
          <div class="options">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <img src="@/assets/more-vertical.svg" alt="message" />
          </div>
        </div>

        <div class="msg-body">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="{ right: message.user_id == $store.getters.user.id }"
            class="msg-block"
          >
            <div class="position">
              <p>{{ message.message }}</p>
            </div>
          </div>
        </div>

        <div class="message-input">
          <b-form-input
            placeholder="Envie uma mensagem"
            id="send"
            v-model="type_message"
          ></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiddlewareService from "@/services/MiddlewareService";
export default {
  data() {
    return {
      users: [],
      type_message: "",
      user_selected: {},
      messages: [],
    };
  },
  methods: {
    getUsers() {
      MiddlewareService.get("user/list").then((resp) => {
        this.users = resp.data.buscados;
      });
    },
    getChat() {
      MiddlewareService.get("chat/list").then((resp) => {
        this.insertMessage(resp.data);
      });
      setInterval(() => {
        MiddlewareService.get("chat/list").then((resp) => {
          this.insertMessage(resp.data);
        });
      }, 5000);
    },
    scrollDown() {
      const element = document.querySelector(".msg-body");
      element.scrollTop = element.scrollHeight;
    },
    insertMessage(messages) {
      messages.forEach((message) => {
        if (!this.messages.find((x) => x.id == message.id)) {
          this.scrollDown();
          this.messages.push(message);
          this.removeCache();
        }
      });
    },
    createMessage(data) {
      MiddlewareService.post("chat/create", data).then((resp) => {
        this.insertMessage(resp.data);
      });
    },
    removeCache() {
      let messages_cache = this.messages.filter((x) => x.id === "cache");
      messages_cache.forEach((message) => {
        let index = this.messages.indexOf(message);
        this.messages.splice(index, 1);
      });
    },
  },
  mounted() {
    this.getUsers();
    this.getChat();
    var side_height = window.getComputedStyle(
      document.querySelector("#side-right")
    ).height;
    document.querySelector(".users-list").style.height =
      +side_height.replace("px", "") - 80 + "px";
    const input_sender = document.querySelector("#send");
    input_sender.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && this.type_message.length) {
        let data = {
          message: this.type_message,
          to_id: 2,
        };
        this.messages.push({
          message: this.type_message,
          user_id: this.$store.getters.user.id,
          id: "cache",
        });
        this.type_message = "";
        this.createMessage(data);
      }
    });
  },
};
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 350px 1fr;
  //   place-content: center;
  overflow: hidden;
  height: 100vh;
  .block {
    height: 100vh;
    background: #111b21;
  }
}
.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #222e35;
  .options {
    display: flex;
    align-items: center;
    gap: 25px;
    padding: 5px;
    img {
      cursor: pointer;
    }
  }
}
.img-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  background: gray;
}
.flex-user {
  display: flex;
  align-items: center;
  gap: 12px;
  p {
    margin: 0;
  }
}
.search-block {
  position: relative;
  display: flex;
  align-items: center;
  background: #222e35;
  padding: 5px;
  gap: 5px;
  border-radius: 10px;
  #search {
    background: #222e35;
    position: relative;
    border: none;
    color: white;
    &::placeholder {
      padding-right: 5px;
      font-size: 15px;
      padding-right: 10px;
    }
    box-shadow: none;
  }
  img {
    padding-left: 5px;
    width: 23px;
  }
}
.users-list {
  padding: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.199);
  margin-top: 5px;
  .user-box {
    padding-top: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 60px;
      height: 60px;
    }
    border-bottom: 0.5px solid rgba(243, 243, 243, 0.247);
  }
}
.last-message {
  color: rgba(0, 0, 0, 0.329);
  font-size: 14px;
}
.msg-info {
  width: 100%;
  .x {
    display: flex;
    justify-content: space-between;
  }
  span {
    display: block;
    margin-top: 0px;
  }
  .vist {
    display: flex;
    img {
      width: 14px;
      margin-top: -20px;
      margin-right: 5px;
    }
  }
}
.msg-panel {
  position: relative;
  background: url("https://e1.pxfuel.com/desktop-wallpaper/407/713/desktop-wallpaper-in-celebration-of-whatsapps-dark-mode-whatsapp-aesthetic.jpg") !important;
  .message-input {
    position: absolute;
    bottom: 8px;
    width: 100%;
    padding: 0 10px;
    input {
      border-radius: 15px;
      padding: 15px;
      background: #222e35;
      border: none;
      color: white;
      border: none !important;
      box-shadow: none;
    }
  }
}
.user-panel {
  border-left: 1px solid #192227;
}
.msg-body {
  position: relative;
  height: 85%;
  overflow-y: scroll;
  padding: 5px;
  .msg-block {
    padding: 5px;
    text-align: left;
    white-space: pre-wrap;
    display: block;
    margin-bottom: 5%;
    display: flex;
    .position {
      background: #176b5b;
      color: white;
      max-width: 35%;
      padding: 10px;
      border-radius: 5px;
      word-break: break-all;
      padding-right: 35px;
    }
  }
}
.msg-body::-webkit-scrollbar-thumb {
  background-color: #42454773;
  border-radius: 20px;
}
.msg-body::-webkit-scrollbar-track {
  background-color: transparent;
}
.msg-body::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
::-webkit-scrollbar-track {
  background: transparent;
}
.right {
  justify-content: flex-end !important;
}
span,
p {
  color: white !important;
}
svg {
  cursor: pointer;
}
</style>