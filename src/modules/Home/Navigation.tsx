
import { Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom';
import phone from '../../assets/images/phone.svg'
import face from '../../assets/images/face.svg'
import youtube from '../../assets/images/youtube.svg'


const { SubMenu } = Menu;
const listSubMenu: string[] = ['thucanthucung', 'vatdungthucung', 'phukienthucung', 'dochoithucung', 'chocanh', 'meocanh', 'thukieng', 'hamster', 'thucungkhac']
function Navigation() {
    const location = useLocation();
    const current = location.pathname.split('/');
    return (

        <div className='menu'>
            <Menu className='navBar' selectedKeys={[listSubMenu.indexOf(current[2]) === -1 ? current[1] : current[2]]} mode="horizontal">
                <Menu.Item id='nav_item_home' key="">
                    Trang chủ
                    <Link to={'/'} />
                </Menu.Item>
                <SubMenu key="thucung" title={<><span>Thú cưng</span><CaretDownOutlined /></>}>
                    <Menu.Item key="chocanh">
                        Chó cảnh
                        <Link to={'/thucung/chocanh'} />
                    </Menu.Item>
                    <Menu.Item key="meocanh">
                        Mèo cảnh
                        <Link to={'/thucung/meocanh'} />
                    </Menu.Item>
                    <Menu.Item key="thukieng">
                        Thú kiểng
                        <Link to={'/thucung/thukieng'} />
                    </Menu.Item>
                    <Menu.Item key="hamster">
                        Hamster
                        <Link to={'/thucung/hamster'} />
                    </Menu.Item>
                    <Menu.Item key="thucungkhac">
                        Khác(Bò sát, bọ ú...)
                        <Link to={'/thucung/thucungkhac'} />
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="cuahang" title={<><span>Cửa hàng</span><CaretDownOutlined /></>}>
                    <Menu.Item key="thucanthucung">
                        Thức ăn thú cưng
                        <Link to={'/thucanthucung'} />
                    </Menu.Item>
                    <Menu.Item key="vatdungthucung">
                        Vật dụng thú cưng
                        <Link to={'/vatdungthucung'} />
                    </Menu.Item>
                    <Menu.Item key="phukienthucung">
                        Phụ kiện thú cưng
                        <Link to={'/phukienthucung'} />
                    </Menu.Item>
                    <Menu.Item key="dochoithucung">
                        Đồ chơi thú cưng
                        <Link to={'/dochoithucung'} />
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="dichvu">
                    Dịch vụ
                    <Link to={'/dichvu'} />
                </Menu.Item>
                <Menu.Item key="tapchi">
                    Tạp chí thú cưng
                    <Link to={'/tapchi'} />
                </Menu.Item>
                <Menu.Item key="gioithieu">
                    Giới thiệu
                    <Link to={'/gioithieu'} />
                </Menu.Item>
            </Menu>
            <div className='icon'>
                <img src={phone} alt="Phone" />
                <span style={{ fontWeight: "500", fontSize: "16px" }}>0956789999</span>
                <a href="#"><img style={{ marginLeft: "50px" }} src={face} alt="Facebook" /></a>
                <a href="#"><img style={{ marginLeft: "20px" }} src={youtube} alt="Youtube" /></a>

            </div>

        </div>

    )
}

export default Navigation