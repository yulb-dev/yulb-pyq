import { useStore } from '@/stores/counter'
import { Login } from '@/network/index'

const store = useStore()

async function getUserProfile() {
    try {
        const { userInfo } = await uni.getUserProfile({
            desc: '用于获取用户头像、昵称',
        })
        const { code } = await wx.login()
        if (code) {
            const data = {
                name: userInfo.nickName,
                avatar: userInfo.avatarUrl,
                code
            }
            Login.post({ data }).then((res) => {
                store.InitUser(res.data)
            })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
    } catch (err) {
        console.log(err);
        return
    }
}
function toPersonalSpace(id) {
    if (store.userIsLogin && store.user.data._id === id)
        uni.switchTab({
            url: '/pages/four/index'
        });
    else
        uni.navigateTo({
            url: '../UserHome/UserHome?userid=' + id
        });
}
function goDetails(cardId) {
    uni.navigateTo({
        url: '/pages/index/detailsPage?cardid=' + cardId
    });
}
function goLabelsPage(label) {
    uni.navigateTo({
        url: '../LabelsPage/labelsPage?label=' + label
    });
}

function formValidation(imgChange, labels, title, textareaValue) {
    if (!imgChange.value) {
        console.log('请上传图片');
        return false
    }
    if (labels == 0) {
        console.log('添加标签');
        return false
    }
    if (labels > 5) {
        console.log('标签过多');
        return false
    }
    if (!title.replace(/\s/g, "")) {
        console.log('请规范标题');
        return false
    }
    if (!textareaValue.replace(/\s/g, "")) {
        console.log('请规范内容');
        return false
    }
    return true
}

export { getUserProfile, toPersonalSpace, goDetails, goLabelsPage, formValidation }