import './css/main.less'
import pinyinjs from 'thepinyin.js'

class Fav {
  constructor () {
    try {
      this.names = JSON.parse(window.localStorage.getItem('fav')) || []
    } catch (error) {
      this.names = []
    }
    this.save()
  }

  add (name) {
    if (!this.names.includes(name)) {
      this.names.push(name)
      this.save()
    }
  }

  remove (name) {
    this.names = this.names.filter(n => n !== name)
    this.save()
  }

  save () {
    const favEl = document.querySelector('.fav')
    if (this.names.length === 0) {
      favEl.innerHTML = '<a>请点击上方的名字来收藏于此</a>'
    } else {
      favEl.innerHTML = this.names.map(n => `<a class="fav-name" href="#" data-name="${n}">${n}</a>`).join('')
    }
    window.localStorage.setItem('fav', JSON.stringify(this.names))
  }
}

class Chinese {
  constructor () {
    this._source = ['万', '川', '之', '广', '山', '士', '千', '云', '长', '巨', '友', '中', '见', '元', '方', '以', '仁', '介', '允', '公', '书', '本', '世', '正', '训', '宁', '让', '汇',
      '永', '石', '左', '右', '业', '归', '北', '仪', '白', '令', '乐', '处', '半', '边', '芒', '权', '存', '迈', '师', '光', '同', '先', '乔', '自', '任', '后', '合', '企',
      '庄', '亦', '齐', '冲', '羊', '州', '池', '防', '如', '观', '纪', '远', '孝', '声', '极', '束', '来', '伯', '步', '希', '谷', '况', '应', '辛', '启', '陆', '奉', '青',
      '尚', '易', '和', '征', '周', '京', '放', '肃', '承', '孟', '始', '绍', '经', '贯', '项', '城', '挺', '荣', '南', '相', '柏', '树', '威', '厚', '临', '览', '显', '星',
      '宜', '矩', '适', '科', '复', '重', '段', '顺', '修', '信', '泉', '叙', '勉', '律', '饶', '度', '庭', '姿', '音', '施', '阁', '济', '洲', '恢', '举', '宣', '觉', '宪',
      '语', '祝', '退', '既', '贺', '盈', '绘', '耕', '泰', '素', '载', '起', '都', '哲', '荷', '晋', '真', '桐', '桥', '索', '栗', '夏', '原', '殊', '顾', '致', '柴', '恩',
      '积', '俯', '途', '颂', '逢', '高', '席', '准', '效', '离', '唐', '资', '凉', '竞', '涉', '海', '阅', '益', '润', '悟', '宽', '朗', '谊', '陶', '陵', '预', '通', '能',
      '梦', '域', '著', '基', '桑', '培', '盛', '辅', '堂', '常', '野', '唯', '跃', '晚', '崇', '犁', '符', '敏', '悠', '得', '悉', '猛', '康', '鹿', '章', '竟', '旋', '望',
      '清', '渠', '添', '渐', '渔', '梁', '深', '惜', '随', '隆', '隐', '绩', '维', '绪', '绵', '琴', '堪', '越', '斯', '敬', '朝', '植', '椅', '惠', '确', '紫', '雁', '雅',
      '敞', '遇', '景', '铸', '锐', '程', '策', '筑', '筝', '傅', '储', '奥', '循', '舒', '然', '阔', '善', '羡', '尊', '道', '游', '寒', '裕', '谦', '疏', '絮', '登', '缘',
      '塘', '蓬', '蒙', '楚', '龄', '路', '照', '锡', '锦', '辞', '筹', '遥', '愈', '微', '新', '韵', '意', '数', '慈', '源', '溪', '滨', '谨', '静', '碧', '歌', '慕', '遮',
      '端', '漫', '赛', '谱', '增', '影', '墨', '镇', '黎', '稼', '德', '遵', '潜', '潮', '燕', '薪', '衡', '凝', '戴', '穗', '鹰', '彰', '潭', '澳', '澈', '澜', '澄', '鹤',
      '艾', '玄', '仲', '伦', '伊', '玖', '杉', '轩', '纬', '玫', '枢', '枫', '郁', '歧', '卓', '秉', '岳', '宛', '弥', '陌', '绅', '绎', '荔', '昭', '钦', '衍', '奕', '咨',
      '耘', '秦', '逊', '炫', '峻', '凌', '诺', '萧', '曼', '晦', '矫', '笙', '舶', '翎', '逸', '焕', '淳', '渊', '尉', '婉', '颇', '综', '琢', '壹', '翘', '棠', '鼎', '晰',
      '敦', '竣', '遂', '湘', '渤', '寓', '犀', '蒲', '楷', '睦', '瑟', '稚', '魁', '靖', '溯', '缤', '赫', '蔚', '榕', '熙', '榛', '豫', '辙', '儒', '瞻', '璧', '麟', '巍',
      '珍', '瑜', '瑾', '珞', '瑶', '理', '璋', '江', '河', '沐', '沛', '浦', '沪', '渝', '松', '柏', '杨', '柳', '枫', '桦', '桐', '镇', '钦', '锡', '锐', '钟', '铠', '铮']
    this._chars = this._source
    this._filterStr = ''
    this.surname = ''
  }

  get chars () {
    return this._chars
  }

  get filters () {
    return this._filterStr.split(' ').filter(c => c)
  }

  set filters (filterStr) {
    this._filterStr = filterStr
    this._chars = this._source.filter(c => {
      const py = pinyinjs.py(c, pinyinjs.NOMARK).join('')
      return !this.filters.some(filter => py.includes(filter))
    })
    document.getElementById('filters-info').innerHTML = `当前字库大小: <span>${this.chars.length}</span>`
  }

  pickChar () {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }

  gen (len) {
    let ret = this.surname
    while (len-- > 0) {
      ret += this.pickChar()
    }
    return ret
  }
}

const F = new Fav()
const C = new Chinese()
const total = 300
const FILTERS_KEY = 'filters'
const SURNAME_KEY = 'surname'
const NAME_LENGTH = 'name_length'
window.addEventListener('DOMContentLoaded', e => {
  const filterStr = window.localStorage.getItem(FILTERS_KEY) || ''
  const surname = window.localStorage.getItem(SURNAME_KEY) || ''
  const nameLength = window.localStorage.getItem(NAME_LENGTH) || 2
  document.getElementById('filters').value = filterStr
  document.getElementById('surname').value = surname
  document.getElementById('name-length').value = nameLength
  C.filters = filterStr
  const mainEl = document.querySelector('main')
  document.querySelector('form').addEventListener('submit', generateNames)

  mainEl.addEventListener('click', ev => {
    if (ev.target.matches('a.name')) {
      ev.preventDefault()
      ev.stopPropagation()
      F.add(ev.target.dataset.name)
    }
  })

  document.querySelector('.toggle-pocket').addEventListener('click', togglePocket)
  const pocketEl = document.querySelector('.pocket')
  pocketEl.addEventListener('click', ({ target }) => {
    if (target.matches('a.fav-name')) {
      F.remove(target.dataset.name)
    }
  })

  generateNames()
  document.querySelector('#cloak').style.display = 'none'
}, false)

function generateNames (e) {
  if (e) e.preventDefault()

  const surname = document.getElementById('surname').value.trim()
  const filtersStr = document.getElementById('filters').value.trim()
  const nameLength = parseInt(document.getElementById('name-length').value.trim()) || 2
  window.localStorage.setItem(FILTERS_KEY, filtersStr)
  window.localStorage.setItem(SURNAME_KEY, surname)
  window.localStorage.setItem(NAME_LENGTH, nameLength)
  C.surname = surname
  C.filters = filtersStr
  C.nameLength = nameLength
  const names = []
  for (let i = 0; i < total; i++) {
    names.push(C.gen(nameLength))
  }
  document.querySelector('main').innerHTML = names.map(name => `<a class="name" href="#" data-name="${name}">${name}</a>`).join('')
}

function togglePocket (ev) {
  document.querySelector('.pocket').classList.toggle('active')
}
