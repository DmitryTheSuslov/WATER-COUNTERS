
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Address} from "modules/types.ts";
import {isHomePage, isAddressPage} from "utils/utils.ts";

interface BreadcrumbsProps {
    currentAddress: T_Address | null
}

const Breadcrumbs = ({ currentAddress }: BreadcrumbsProps) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/addresses") &&
                <BreadcrumbItem active>
                    <Link to="/addresses">
						Адреса
                    </Link>
                </BreadcrumbItem>
			}
            {isAddressPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { currentAddress?.address_name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs
