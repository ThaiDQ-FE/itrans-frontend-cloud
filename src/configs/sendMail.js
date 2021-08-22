/**
 * @name: title accept account
 */
export const titleAcceptAccount = () => {
  const title = "ITRANS - THÔNG BÁO DUYỆT TÀI KHOẢN";
  return title;
};
/**
 * @name: title delete article
 */
export const titleDeleteArticle = () => {
  const title = "ITRANS - Thông báo tin tức không hợp lệ";
  return title;
};

export const titleInvite = () => {
  const title = "ITRANS - LỜI MỜI THAM GIA VÒNG GỌI VỐN";
  return title;
};

export const titleAcceptDeal = () => {
  const title = "ITRANS - THỎA THUẬN ĐƯỢC CHẤP NHẬN";
  return title;
};

export const titleDenyDeal = () => {
  const title = "ITRANS - THỎA THUẬN BỊ TỪ CHỐI";
  return title;
};

export const titleMessDeal = () => {
  const title = "ITRANS - NHÀ ĐẦU TƯ THAM GIA";
  return title;
};

/**
 * @name: content accept account
 */
export const contentAcceptAccount = (gmail, type, find) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Phê duyệt tài khoản</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Tài khoản của bạn đã được xét duyệt thành công.</p> <p style='font-size: 18px;font-weight: 600;font-style: italic;'>Hiện tại bạn có thể đăng nhập vào ITRANS thông qua gmail: ${gmail}.</p><p style='font-size: 20px;font-weight: 600; color: red;font-style: italic;margin-bottom: 0px;'>Bạn có thể:</p><ul style='margin: 0px;'><li style='font-size: 16px;font-weight: 600;font-style: italic;'>${type}</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Đăng tải bài viết</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Tìm kiếm ${find}</li></ul><p style='font-size: 18px;font-weight: 600;margin-top: 0px;'>Một lần nữa ban quản trị ITRANS xin cảm ơn bạn đã gia nhập vào cộng đồng ITRANS</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};

export const contentInviteRound = (nameOrg, money, percent, Des) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Lời mời tham gia vòng gọi vốn</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Tổ chức khởi nghiệp ${nameOrg} vừa mời bạn tham gia vào vòng gọi vốn.</p><p style='font-size: 20px;font-weight: 600; color: red;font-style: italic;margin-bottom: 0px;'>Thông tin:</p><ul style='margin: 0px;'><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Số tiền kêu gọi: ${money} Tỷ VNĐ</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Phần trăm cổ phần: ${percent}%</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Nội dung: ${Des}</li></ul><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Tại trang chủ - Lời mời từ tổ chức. Bạn có thể xem những lời mời được gửi tới và tham gia vào vòng gọi vốn theo ý của bạn.</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};

export const contentAcceptDealInv = (nameOrg, gmail) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Chấp nhận thỏa thuận</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Tổ chức khởi nghiệp ${nameOrg} đã chấp nhận thỏa thuận của bạn. </p> <p style='font-size: 18px;font-weight: 600'>Bạn vui lòng liên hệ với email: ${gmail} để được tổ chức khởi nghiệp cung cấp thời gian gặp mặt để thảo luận thêm.</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};
export const contentAcceptDealOrg = (nameInv, gmail) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Chấp nhận thỏa thuận</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Bạn vừa chấp nhận thỏa thuận của nhà đầu tư ${nameInv}.</p> <p style='font-size: 18px;font-weight: 600'>Bạn vui lòng liên hệ với email: ${gmail} cung cấp thời gian gặp mặt với nhà đầu tư.</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};

export const contentDenyDeal = (nameInv) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Từ chối thỏa thuận</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Tổ chức khởi nghiệp ${nameInv} đã từ chối thỏa thuận của bạn</p> <p style='font-size: 18px;font-weight: 600'>Bạn có thể tìm vòng gọi vốn khác tại mục "Vòng gọi vốn".</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};

export const contentJoin = (nameInv, money, percent, des) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Tham gia vòng gọi vốn</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Nhà đầu tư ${nameInv} vừa tham gia vào vòng gọi vốn.</p><p style='font-size: 20px;font-weight: 600; color: red;font-style: italic;margin-bottom: 0px;'>Thông tin:</p><ul style='margin: 0px;'><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Số tiền đầu tư: ${money} Tỷ VNĐ</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Phần trăm cổ phần: ${percent}%</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Nội dung: ${des}</li></ul><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Bạn có thể chấp nhận hoặc từ chối thỏa thuận. Tại "Trang cá nhân" - "Vòng gọi vốn"</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};

export const contentDeleteArticle = () => {
  const content =
    "<span>Xin chào,</span><br/><span>Chúng tôi muốn thông báo rằng tin tức của bạn đã bị xóa.<br/><span>Hãy chắc chắn rằng tín tức của bạn phù hợp và tuân thủ tiêu chuẩn cộng đồng.</span><br/><span >Mọi thắc mắc vui lòng liên hệ qua:<span style='color: blue'>itrans2021@gmail.com</span></span><br/><i >Đây là thông báo tự động.Vui lòng không reply mail này.</i>";
  return content;
};
