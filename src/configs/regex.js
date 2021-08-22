export const validGmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
/**
 * (http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?:
 * - Có thể có http://www. hoặc https://www. hoặc http: hoặc https://
 * [a-z0-9]:
 * -có thể nhập từ a - z, 0 - 9 in hoa viết thường
 *([\-\.]{1}[a-z0-9]+)*
 * * là 0 có hoặc nhiều
 * \- matchs đấu -
 * \. matchs dấu .
 * {1} tối đa 1 dấu
 * [a-z0-9]+ 1 hoặc nhiều match trong []
 * ([\-\.]{1}[a-z0-9]+)* =>check chỉ có 1 chấm hoặc 1 - và sau nó phải tồn tại ít nhất 1 chữ hoặc số
 * \.matchs dấu .
 *[a-z]{2,5}:
 * có thể nhập a-z tối thiểu 2 ký tự và tối đa 5 ký tự
 */
export const checkLinkWeb =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\/.*)?$/;
