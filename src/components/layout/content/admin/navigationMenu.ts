import { useTranslations } from "next-intl";
// Icons
import {
    UsersIcon,
    MapPinIcon,
    BanknotesIcon,
    CreditCardIcon,
    ArrowPathRoundedSquareIcon,
    LockClosedIcon,
    Cog8ToothIcon,

    CalendarIcon,
    MinusCircleIcon,
    SquaresPlusIcon,

    Squares2X2Icon,
    TicketIcon,
    CalendarDaysIcon,
    ReceiptRefundIcon,

    AdjustmentsHorizontalIcon,
    DocumentCheckIcon,
} from '@heroicons/react/24/outline';

export function NavigationMenu(path: string) {
    const t = useTranslations("Panel_SideBar");

    //console.log(path)
    //console.log(path.split('/').length)

    const profile_navigation = [
        { name: t('profile.info'), icon: UsersIcon, current: path.split('/').length < 4, href: '/panel/profile' },
        { name: t('profile.address'), icon: MapPinIcon, current: path.includes('address'), href: '/panel/profile/address' },
        { name: t('profile.billing'), icon: BanknotesIcon, current: path.includes('billing'), href: '/panel/profile/billing' },
        { name: t('profile.card.name'), icon: CreditCardIcon, current: path.includes('card'), href: '/panel/profile/card' },
        { name: t('profile.request'), icon: ArrowPathRoundedSquareIcon, current: path.includes('request'), href: '/panel/profile/request' },
        { name: t('profile.security'), icon: LockClosedIcon, current: path.includes('security'), href: '/panel/profile/security' },
        {
            name: t('profile.config.config'), icon: Cog8ToothIcon, children: [
                { name: t('profile.config.general'), current: path.includes('config') && path.split('/').length < 5, href: '/panel/profile/config' },
                { name: t('profile.config.follow'), current: path.includes('follow'), href: '/panel/profile/config/follow' },
                { name: t('profile.config.custom'), current: path.includes('custom'), href: '/panel/profile/config/custom' },
                { name: t('profile.config.delete'), current: path.includes('delete'), href: '/panel/profile/config/delete' },
            ],
        },
    ]

    const event_navigation = [
        { name: t('event.event'), icon: CalendarIcon, current: (path.split('/').length < 4 || (path.split('/').length < 5 && path.includes('event/create'))), href: '/panel/event/' },
        { name: t('event.discount'), icon: MinusCircleIcon, current: path.includes('discount'), href: '/panel/event/discount' },
        { name: t('event.special'), icon: SquaresPlusIcon, current: path.includes('special'), href: '/panel/event/special' },
    ]

    const ticket_navigation = [
        { name: t('ticket.ticket'), icon: TicketIcon, current: path.split('/').length < 4, href: '/panel/ticket' },
        /*{ name: t('ticket.refund'), icon: ReceiptRefundIcon, current: path.includes('refund'), href: '/panel/ticket/refund' },*/
        { name: t('ticket.subscription.subscription'), icon: CalendarDaysIcon, current: path.includes('subscription'), href: '/panel/ticket/subscription' },
        {
            name: t('ticket.user.user'), icon: UsersIcon, children: [
                { name: t('ticket.user.app'), current: path.includes('user/app'), href: '/panel/ticket/user/app' },
                { name: t('ticket.user.pos'), current: path.includes('user/pos'), href: '/panel/ticket/user/pos' },
            ],
        },
    ]

    const admin_navigation = [
        {
            name: t('admin.config.config'), icon: AdjustmentsHorizontalIcon, children: [
                { name: t('admin.config.setting'), current: path.includes('config') && path.split('/').length < 5, href: '/panel/admin' },
                { name: t('admin.config.cookie'), current: path.includes('cookie'), href: '/panel/admin/config/cookie' },
                { name: t('admin.config.term'), current: path.includes('term'), href: '/panel/admin/config/term' },
                { name: t('admin.config.privacy'), current: path.includes('privacy'), href: '/panel/admin/config/privacy' },
            ],
        },
        {
            name: t('admin.event.event'), icon: CalendarIcon, children: [
                { name: t('admin.event.category'), current: path.includes('event/category'), href: '/panel/admin/event/category' },
                { name: t('admin.event.subcategory'), current: path.includes('event/subcategory'), href: '/panel/admin/event/subcategory' },
                { name: t('admin.event.subsubcategory'), current: path.includes('event/subsubcategory'), href: '/panel/admin/event/subsubcategory' },
                { name: t('admin.event.supplier'), current: path.includes('event/supplier'), href: '/panel/admin/event/supplier' },
                { name: t('admin.event.tag'), current: path.includes('event/tag'), href: '/panel/admin/event/tag' },
                {
                    name: t('admin.event.venue'), href: '/panel/admin/event/venue', children: [
                        { name: t('admin.event.category'), current: path.includes('venue/category') && path.split('/').length > 5, href: '/panel/admin/event/venue/category' },
                        { name: t('admin.event.venue'), current: path.includes('venue') && path.split('/').length < 6, href: '/panel/admin/event/venue' },
                    ]
                },
            ],
        },
        {
            name: t('admin.review'), icon: DocumentCheckIcon, current: false, children: [
                { name: t('admin.user'), current: path.includes('review/user'), href: '/panel/admin/review/user' },
            ],
        },
        { name: t('admin.user'), icon: UsersIcon, current: path.includes('admin/user'), href: '/panel/admin/user/' },
    ]

    if (path.includes('profile')) {
        return profile_navigation;
    } else if ((path.includes('event') && path.split('/').length < 4) || path.includes('event/create') || path.includes('event/discount') || path.includes('event/special')) {
        return event_navigation;
    } else if (path.includes('ticket')) {
        return ticket_navigation;
    } else if (path.includes('admin')) {
        return admin_navigation;
    } else {
        return profile_navigation;
    }
}
