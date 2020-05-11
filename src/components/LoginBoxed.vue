<template>
    <div>
        <div class="hh-100 bg-plum-plate bg-animation">
            <div class="d-flex hh-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <Form @submit.stop.prevent="onLogin()">
                                <div class="modal-body">
                                    <div class="h5 modal-title text-center">
                                        <h4 class="mt-2">
                                            <div>Welcome back,</div>
                                            <span>Please sign in to your account below.</span>
                                        </h4>
                                    </div>
                                    <b-form-group id="exampleInputGroup1"
                                                label-for="exampleInput1"
                                                description="We'll never share your email with anyone else.">
                                        <b-form-input id="email"
                                                    name="email"
                                                    type="email"
                                                    v-model="email"
                                                    required
                                                    placeholder="Enter email...">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group id="exampleInputGroup2"
                                                label-for="exampleInput2">
                                        <b-form-input id="password"
                                                    name="password"
                                                    type="password"
                                                    v-model="password"
                                                    required
                                                    placeholder="Enter password...">
                                        </b-form-input>
                                    </b-form-group>
                                    <div class="divider"/>
                                </div>
                                <div class="modal-footer clearfix">
                                    <div class="float-right">
                                        <b-button variant="primary" size="lg" type="submit">Login to Message</b-button>
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
    </div>
</template>

<script>

    import Slick from 'vue-slick';

    export default {
        components: {
            Slick
        },
        data: () => ({

            slickOptions6: {
                dots: true,
                infinite: true,
                speed: 500,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                initialSlide: 0,
                autoplay: true,
                adaptiveHeight: true
            },

            slide: 0,
            sliding: null,
            email: '',
            password: '',
            request_email: '',

        }),

        methods: {
            onLogin() {
                this.axios.post('/api/user/login', 
                    {
                        email: this.email,
                        password: this.password
                    }).then((response) => {
                        console.log(response.data.status);
                        if(response.data.status === 'success'){
                            this.$store.dispatch('setLoginFlag', true);
                            this.$store.dispatch('setUser', response.data.data);
                            this.$router.push('/messagebox');
                            localStorage.token = response.data.token;
                        }
                    }).catch((error) => {
                        
                    });
            }
        }
    }
</script>
