<style lang="scss" scoped>
</style>

<template>
    <v-layout row justify-center style="position: relative;">
        <v-dialog v-model="active" lazy absolute max-width="900">
            <v-card>
                <v-card-title>
                    <div class="headline">{{ title }}</div>
                </v-card-title>
                <v-card-media :src="'/static/portfolios/' + image" height="450">
                </v-card-media>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" @click.native="active = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        props: ['title', 'image', 'active'],
    }
</script>