<template>
  <div>
    <b-card>
      <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
      <!-- Main table element -->
        <div class="hh-100">
            <div class="d-flex hh-150 justify-content-center align-items-center">
                <b-col md="16" class="mx-auto app-login-box">
                    <div class="modal-dialog w-200 mx-auto">
                        <div class="modal-content">
                            <Form @submit.stop.prevent="onMessage()">
                                <div class="modal-body">
                                    <div class="h5 modal-title text-center">
                                        <h4 class="mt-2">
                                            <div>Message Box</div>
                                            <span>Please send Camera Message to Server.</span>
                                        </h4>
                                    </div>
                                    <span>CompanyId</span>
                                    <b-form-group id="exampleInputGroup1"
                                                label-for="companyId">
                                        <b-form-input id="companyId"
                                                    name="companyId"
                                                    type="number"
                                                    v-model="companyId"
                                                    required
                                                    placeholder="Input Company Id...">
                                        </b-form-input>
                                    </b-form-group>                                    
                                    <span>StationId</span>
                                    <b-form-group id="exampleInputGroup2"
                                                label-for="stationId">
                                        <b-form-input id="stationId"
                                                    name="stationId"
                                                    type="number"
                                                    v-model="stationId"
                                                    required
                                                    placeholder="Input Station Id...">
                                        </b-form-input>
                                    </b-form-group>
                                    <span>CameraId</span>
                                    <b-form-group id="exampleInputGroup3"
                                                label-for="cameraId">
                                        <b-form-input id="cameraId"
                                                    name="cameraId"
                                                    type="number"
                                                    v-model="cameraId"
                                                    required
                                                    placeholder="Input Camera Id...">
                                        </b-form-input>
                                    </b-form-group>
                                    <span>Message</span>
                                    <b-row class="mb-3">
                                        <b-col sm="12">
                                            <b-form-textarea
                                                id="textarea"
                                                v-model="message"
                                                placeholder="Input Message..."
                                                rows="5"
                                                max-rows="10"
                                            ></b-form-textarea>
                                        </b-col>
                                    </b-row>                                                                                                         
                                    <div class="divider"/>
                                </div>
                                <div class="modal-footer clearfix">
                                    <div class="float-right">
                                        <b-button variant="primary" size="lg" type="submit" @click="SendMessageToken()">SendMessage(Token)</b-button>
                                    </div>
                                    <div class="float-right">
                                        <b-button variant="primary" size="lg" type="submit" @click="SendMessageUser()">SendMessage(User)</b-button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; CT Project 2020
                    </div>
                </b-col>
            </div>
        </div>

    </b-card>
  </div>
</template>

<script>
  import PageTitle from "./PageTitle.vue";
  import io from "socket.io-client";

  export default {
    components: {
      PageTitle,
    },

    created() {
    },

    data: () => ({
      heading: 'MessageBox',    
      subheading: 'MessageBox which send cameara data to Server.',
      icon: 'pe-7s-notebook icon-gradient bg-mixed-hopes',

      stationId: '',
      companyId: '',
      cameraId: '',
      message: '',
      apiFlag: 0,
      staId: 0,
      comId: 0,
      camId: 0
    }),

    computed: {
    },

    methods: {
        onMessage() {
            this.comId = parseInt(this.companyId);
            this.staId = parseInt(this.stationId);
            this.camId = parseInt(this.cameraId);

            if (this.apiFlag === 1) {
                this.axios.post('/api/messagetoken/receive_message_token', 
                {
                    companyId: this.comId,
                    stationId: this.staId,
                    cameraId: this.camId,
                    message: this.message
                }).then((response) => {
                    console.log(response.data.status);
                    if(response.data.status === 'success'){
                        console.log('Token Success');
                        localStorage.token = response.data.token;
                    }
                }).catch((error) => {
                      
                });
            }
            else if (this.apiFlag === 2) {                
                this.axios.post('/api/messageuser/receive_message_user', 
                {
                    email: this.$store.getters.getUser.email,
                    password: this.$store.getters.getUser.password,
                    companyId: this.comId,
                    stationId: this.staId,
                    cameraId: this.camId,
                    message: this.message
                }).then((response) => {
                    console.log(response.data.status);
                    if(response.data.status === 'success'){
                        console.log('User Success');
                        localStorage.token = response.data.token;
                    }
                }).catch((error) => {
                      
                });
            }
            this.stationId = this.companyId = this.cameraId = this.message = '';

        },

        SendMessageToken() {
            console.log('SendMessageToken');
            this.apiFlag = 1;
        },

        SendMessageUser() {
            console.log('SendMessageUser');
            this.apiFlag = 2;
        }
    }
  }
</script>