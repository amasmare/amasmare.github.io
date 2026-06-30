# الجزء العملي — التدريب على إعداد الأجهزة

## أوضاع واجهة الأوامر (CLI)
- `Router>` — وضع المستخدم (User EXEC).
- `Router#` — الوضع المتميّز (Privileged) عبر `enable`.
- `Router(config)#` — الإعداد العام عبر `configure terminal`.
- `Router(config-if)#` — إعداد منفذ.

## أوامر أساسية
```
enable                                   ! للوضع المتميّز
configure terminal                       ! للإعداد العام
hostname R1                              ! تسمية الجهاز
interface g0/0                           ! دخول منفذ
 ip address 192.168.1.1 255.255.255.0    ! إسناد عنوان
 no shutdown                             ! تشغيل المنفذ
show ip interface brief                  ! ملخص حالة المنافذ
show running-config                      ! عرض الإعدادات الجارية
ping 192.168.1.2                         ! اختبار الاتصالية
copy running-config startup-config       ! حفظ الإعدادات
```

> الأمثلة العملية المفصّلة مشروحة على قرص الـ DVD المرفق بالكتاب.
</content>
