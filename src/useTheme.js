import {ref} from 'vue'
import {THEME_KEY} from './storage'
export function useTheme(){
 const dark=ref(false),themeError=ref('')
 try{dark.value=localStorage.getItem(THEME_KEY)==='dark'}catch{themeError.value='无法读取主题偏好，暂时使用浅色模式。'}
 function apply(){document.documentElement.classList.toggle('dark',dark.value)}
 apply()
 function toggle(){
  const next=!dark.value
  try{localStorage.setItem(THEME_KEY,next?'dark':'light');dark.value=next;themeError.value='';apply()}
  catch{themeError.value='主题保存失败，请检查浏览器存储后重试。'}
 }
 return {dark,themeError,toggle}
}
