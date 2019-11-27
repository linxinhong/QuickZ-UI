<template>
    <div>
        <a-row>
            <a-col :span="8">
                <MenuList />
            </a-col>
            <a-col :span="16">
        <quill-editor id="editor" v-model="editorContext"  ref="myQuillEditor" :options="editorOption">
        </quill-editor>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import MenuList from '../components/MenuList'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

hljs.configure({
    languages: [
        'autohotkey',
        'json',
        'yaml',
        'ini',
        'markdown'
    ]
})

export default {
    data() {
        return {
            editorContext:'!z::reload',
            editorOption: {
                modules: {
                    toolbar: [['code-block']],
                    syntax: {
                        highlight: text => hljs.highlightAuto(text, ['autohotkey']).value
                }
            }
            }
        }
    },
    components: {
        MenuList
    }
}
</script>

<style>
    #editor {
        height: 500px;
    }
</style>