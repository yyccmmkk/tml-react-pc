const list = require('./store');

list.push(
  ...[
    {
      method: 'get',
      path: '/async/list',
      data: {
        code: 200,
        msg: 'success',
        data: ['张三', '李四', '王五', '刘六', '丁七', '木八', '盛九', '潘十'],
      },
    },
    {
      method: 'get',
      path: '/tangCarController/getRQCode',
      data: {
        code: 200,
        message: 'SUCCESS',
        data: {
          url: 'https://m.tangche.com/meeting-book/checkin-code?qrcode=621983f871d161221fd3c678#checkin-code&yf=la&laid=10816',
          base64:
            'iVBORw0KGgoAAAANSUhEUgAAAL4AAAC+AQAAAACjD4gwAAACcUlEQVR42u2XTarsIBCFKzhwlt6A4DacuaVkA/nZQGdLztyG4AaSmQNJvWO4dOfCm2hP3oMOTZPwgaasU6cqxH+/Mn3BF/wzIBDx5vKc8kQ0GSLbDCIn3phGFivrI/H5AVhMGFlNkkjSmEL/Geg89UZsnnfzKRgk74SLl88Ap/g0/LTxYBzlryOpBMgHwOv3K1GVoGyzW+ptIAD7Sz6VIC7Eq9cL0cMjtfRoB3ywGiReOkBtkw2DbQZhdnnABqxXnx9OjdwOBqxLVJZm5PX9uvWAD6fXxE9SXdKbe6e2HuTeqkfSu4RExC713g74NOHh4mkFIu9SXLkZhMkiJbFk1+D+EkorGFMmwwuevXr4Wz6qAR/QmVMzXIOQm1vk1QBhZ5KZLGIWq8vvnFeDfAlXbCxOoo7pZRn1APpALSl4T/ELEgc3A0QLL0NqIzuE/TayehBhqZPMU/FrJOatknqQUdtdEVyJ/3nbox7AfdA5kFeaURLlvxlAuOIpYfdiN9ActmwGcB+aqDw/pV4hZW4GRW0TVnfUJZh16NpBPBIaNmRHPWm0pVcZ1AN0x9L+t6QGo0+T+3aAPeLG6Gc4StSAmrkZhGuDuLli2WPSaztA84DphNljKEHkNLYDjEqYJEpXG52+jLsdnCZuXpzFFnMv+eBmAAuDSjSMoyfINy62GaDONXuxw8tcnu6lVg2u+oQBocKNGm51Xg/KvLv6y8ukWG7uUw+uGc7y5T6ogVtF1QP0RfgOYu68+pkq2kHcKZ5GzSniNM+PQCAJC4NWFJk8cjso3wYe01seHaq0SLkVlAIoo5tHP8tE+mgH3y/IL/gfwR9PBFC7YXWhtAAAAABJRU5ErkJggg==',
          title: '测试',
          content: '测试',
          meetingPlace: '725会议一室',
          systemCurrentTimeMillis: 1669559516460,
          startDateTime: '2022-02-25 11:30:00',
          meetingPerson: '王道远',
          announcements: '没事不要乱说啊',
        },
      },
    },
    {
      method: 'get',
      path: '/async/num',
      data: {
        code: 200,
        msg: 'success',
        data: {
          num1: 111,
          num2: 222,
          num3: 333,
          num4: 333,
        },
      },
    },
    {
      method: 'get',
      path: '/tangCarController/getNoSignIn',
      data: {
        code: 200,
        message: 'SUCCESS',
        data: {
          countNum: 1,
          userList: [
            {
              ffullname: '数字化事业部',
              userName: '李四',
              fid: null,
              countPerson: null,
              number: '员工编号 ',
            },
          ],
          groupList: [
            {
              ffullname: '数字化事业部',
              userName: '李四',
              fid: '2',
              countPerson: 1,
              number: '员工编号 ',
            },
          ],
        },
      },
    },
    {
      method: 'get',
      path: '/tangCarController/getYesSignIn',
      data: {
        code: 200,
        message: 'SUCCESS',
        data: {
          countNum: 1,
          userList: [
            {
              ffullname: '数字化事业部',
              userName: '李四',
              fid: null,
              countPerson: null,
              number: '员工编号 ',
            },
          ],
          groupList: [
            {
              ffullname: '数字化事业部',
              userName: '李四',
              fid: '2',
              countPerson: 1,
              number: '员工编号 ',
            },
          ],
        },
      },
    },
    {
      method: 'get',
      path: '/tangCarController/getVacate',
      data: {
        code: 200,
        message: 'SUCCESS',
        data: {
          countNum: 1,
          userList: [
            {
              ffullname: '数字化事业部',
              userName: '李四',
              fid: null,
              countPerson: null,
              content: '家里吃太饱',
              number: '员工编号 ',
            },
          ],
          groupList: [
            {
              ffullname: '数字化事业部',
              userName: '李四',
              fid: '2',
              countPerson: 1,
              number: '员工编号 ',
            },
          ],
        },
      },
    },
  ]
);
