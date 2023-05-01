<template>
  <div>
    <div class="main">
      <div id="side-right" class="block">
        <div class="block-header mb-2">
          <img
            src="https://avatars.githubusercontent.com/u/102707728?v=4"
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
          <div class="user-box">
            <img
              src="https://avatars.githubusercontent.com/u/102707728?v=4"
              class="img-icon"
            />
            <div class="msg-info">
              <span class="name mt-4">Eric</span>
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
          <img
            src="https://avatars.githubusercontent.com/u/102707728?v=4"
            class="img-icon"
          />
          <div class="options">
            <img src="@/assets/search.svg" alt="message" />
            <img src="@/assets/more-vertical.svg" alt="message" />
          </div>
        </div>

        <div class="msg-body">
          <div class="msg-block right">
            <div class="position">
              <p>
                document.querySelector('button').addEventListener('click',
                function() { const canvas = document.createElement('canvas');
                canvas.width = window.innerWidth; canvas.height =
                window.innerHeight; const ctx = canvas.getContext('2d');
                ctx.fillStyle= 'white'; ctx.fillRect(0, 0, canvas.width,
                canvas.height); const image = new Image(); image.src =
                canvas.toDataURL('image/png'); document.body.appendChild(image);
                });
              </p>
            </div>
          </div>
          <div class="msg-block">
            <div class="position">
              <p>
                document.querySelector('button').addEventListener('click',
                function() { const canvas = document.createElement('canvas');
                canvas.width = window.innerWidth; canvas.height =
                window.innerHeight; const ctx = canvas.getContext('2d');
                ctx.fillStyle= 'white'; ctx.fillRect(0, 0, canvas.width,
                canvas.height); const image = new Image(); image.src =
                canvas.toDataURL('image/png'); document.body.appendChild(image);
                });
              </p>
            </div>
          </div>
        </div>

        <div class="message-input">
          <b-form-input
            placeholder="Envie uma mensagem"
            id="search"
          ></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var side_height = window.getComputedStyle(
      document.querySelector("#side-right")
    ).height;
    document.querySelector(".users-list").style.height =
      +side_height.replace("px", "") - 80 + "px";
  },
};
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 350px 1fr;
  //   place-content: center;
  height: 100vh;
  .block {
    height: 95vh;
  }
}
.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #e9edef;
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
.search-block {
  position: relative;
  display: flex;
  align-items: center;
  background: #f0f2f5;
  padding: 5px;
  gap: 5px;
  border-radius: 10px;
  #search {
    background: #f0f2f5;
    position: relative;
    border: none;
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.247);
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
  .message-input {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    input {
      border-radius: 15px;
      padding: 15px;
    }
  }
}
.user-panel {
  border-left: 1px solid #dbdcdd;
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
      max-width: 35%;
    }
  }
}
.left {
  justify-content: flex-start !important;
}
.right {
  justify-content: flex-end !important;
}
</style>