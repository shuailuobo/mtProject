<template>
  <div class="add-blog">
    <h2>添加博客</h2>
    <form
      action=""
      v-if="!submitted"
    >
      <label for="">博客标题：</label>
      <input
        type="text"
        v-model="blog.title"
        required
      >

      <label for="">博客内容：</label>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="blog.content"
        required
      ></textarea>

      <div id="checkbox">
        <label for="">Vue.js</label>
        <input
          type="checkbox"
          value="vue.js"
          v-model="blog.categories"
        >
        <label for="">Node.js</label>
        <input
          type="checkbox"
          value="Node.js"
          v-model="blog.categories"
        >
        <label for="">React.js</label>
        <input
          type="checkbox"
          value="React.js"
          v-model="blog.categories"
        >
        <label for="">Angular.js</label>
        <input
          type="checkbox"
          value="Angular.js"
          v-model="blog.categories"
        >
      </div>
      <label for="">作者：</label>
      <select v-model="blog.author">
        <option
          v-for="(author,index) in authors"
          :key="index"
        >{{author}}</option>
      </select>
      <button v-on:click.prevent="post">添加博客</button>
    </form>

    <div v-if="submitted">
      <h3>您的博客发送成功！</h3>
    </div>
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容：{{blog.content}}</p>
      <p>博客分类：</p>
      <ul>
        <li
          v-for="(category,index) in  blog.categories"
          :key="index"
        >
          {{category}}
        </li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>

</template>

<script>
export default {
  //http://jsonplaceholder.typicode.com/posts
  name: "add-blog",
  props: {
    msg: String
  },
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["h1", "h2", "h3"],
      submitted: false
    };
  },
  methods: {
    post: function() {
      this.$http
        .post("http://jsonplaceholder.typicode.com/posts", {
          title: this.blog.title,
          body: this.blog.content,
          userId: this.blog.author
        })
        .then(function() {
          // console.log(data);
          this.submitted = true;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog * {
  box-sizing: border-box;
}

#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  margin: 20px 5px;
  display: block;
}

input[type="text"],
textarea,
select {
  display: block;
  width: 92%;
  padding: 4%;
}

textarea {
  height: 200px;
}

#checkbox label {
  display: inline-block;
  margin-top: 0;
  font-size: 12px;
}

#checkbox input {
  display: inline-block;
  margin-right: 10px;
}

button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  padding: 14px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 18px;
  cursor: pointer;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
  text-align: left;
}

h3 {
  margin-top: 10px;
}

ul,
li {
  list-style: none;
}
</style>
