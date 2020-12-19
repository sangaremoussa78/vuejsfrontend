<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Contact <strong>Us</strong></h2>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="contact-form">
            <div class="status alert alert-success" v-if="this.success_message !== ''">{{ this.success_message }}</div>
            <div v-if="this.errors.length > 0" class="alert alert-danger">
              <p>Please fix these errors</p><br/>
              <ul style="padding: 0">
                <li v-for="error in this.errors" :key="error">{{ error }}</li>
              </ul>
            </div>
            <form id="main-contact-form" class="contact-form row" name="contact-form" method="post" @submit.prevent="submit()">
              <div class="form-group col-md-6">
                <input type="text" name="name" class="form-control"  placeholder="Name" v-model="name">
              </div>
              <div class="form-group col-md-6">
                <input type="email" name="email" class="form-control" placeholder="Email" v-model="email">
              </div>
              <div class="form-group col-md-12">
                <input type="text" name="subject" class="form-control"  placeholder="Subject" v-model="subject">
              </div>
              <div class="form-group col-md-12">
                <textarea name="message" id="message"  class="form-control" rows="8" placeholder="Your Message Here" v-model="message"></textarea>
              </div>
              <div class="form-group col-md-12">
                <input type="submit" name="submit" class="btn btn-primary pull-right" value="Submit" >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Contactus",
        data() {
          return {
            name: "",
            email: "",
            subject: "",
            message: "",
            errors: [],
            success_message: ""
          }
        },
        head() {
          return {
            title: 'Online Shop | Contact us',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: 'Contact us Page'
              }
            ]
          }
        },
        methods: {
          submit() {
            const errors = [];
            if(this.name === "") {
              errors.push("name required");
            }

            if(this.email === "") {
              errors.push("email required");
            }

            if(this.subject === "") {
              errors.push("subject required");
            }

            if(this.message === "") {
              errors.push("message contents required");
            }

            if(errors.length > 0) {
              this.errors = errors;
              return false;
            }

            this.errors = [];

            const data = {
              name: this.name,
              email: this.email,
              subject: this.subject,
              message: this.message
            };

            this.$axios.$post("/api/contact", data).then(res => {

              this.success_message = res.message;

              this.name = "";
              this.email = "";
              this.subject = "";
              this.message = "";
            }).catch(err => {
              console.error(err);
            });
          }
        }
    }
</script>
